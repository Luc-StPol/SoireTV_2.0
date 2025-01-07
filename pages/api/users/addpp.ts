import path from 'path';

import formidable from 'formidable';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import db from '@/lib/db';
import { deleteFile } from '@/lib/middleware/deleteFile';
import { config, formidableMiddleware } from '@/lib/middleware/uploadFile';

import { authOptions } from '../auth/[...nextauth]';

interface UserData extends RowDataPacket {
  id: number;
  profilPicture: string;
}
// Exporter la configuration pour désactiver le bodyParser
export { config };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method not allowed` });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    // Configuration de l'upload
    const uploadDir = path.join(process.cwd(), '/public/images/userspp');

    const { files, fields } = await formidableMiddleware(req, uploadDir);

    if (!files.file) {
      res.status(500).json('file not found');
      return;
    }

    const uploadedFile = files.file[0] as unknown as formidable.File;
    const newFilename = uploadedFile.newFilename;
    const userId = fields.userId as unknown as string;

    const query = 'SELECT profilPicture FROM users WHERE id = ?';
    db.query(query, [userId], (err, results: UserData[]) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
      }
      const userPp = results[0].profilPicture;

      //delete previous pp from storage & db
      if (userPp) {
        try {
          const filePath = path.join(
            process.cwd(),
            '/public/images/userspp/',
            userPp,
          );
          deleteFile(filePath);
        } catch (err) {
          res
            .status(500)
            .json({ message: "previous profil picture can't be deleted", err });
        }
      }

      const query2 = 'UPDATE users SET profilPicture = ? WHERE id = ?';

      db.query(query2, [newFilename, userId], (err) => {
        if (err) {
          res.status(500).json({
            message: 'error',
            error: err.message,
            errno: err.errno,
          });
          return;
        }
        res.status(200).json({
          message: 'File uploaded successfully!',
          newFilename,
          uploadedFile,
        });
      });
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Something went wrong during the upload.' });
  }
}
// Removed the conflicting local function definition
