import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import db from '@/lib/db';
import { config, formidableMiddleware } from '@/lib/middleware/uploadFile';

import { authOptions } from '../auth/[...nextauth]';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const { files, fields } = await formidableMiddleware(req, '/tmp');

    if (!files.file) {
      res.status(500).json('file not found');
      return;
    }

    const uploadedFile = files.file[0] as unknown as formidable.File;
    const userId = fields.userId as unknown as string;

    const result = await cloudinary.uploader.upload(uploadedFile.filepath, {
      folder: 'user_profiles',
      public_id: uploadedFile.newFilename,
    });

    const newFilename = result.public_id;

    const query = 'SELECT profilPicture FROM users WHERE id = ?';
    db.query(query, [userId], (err, results: UserData[]) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
      }
      const userPp = results[0].profilPicture;

      console.log('USERPP', userPp);

      //delete previous pp from storage & db
      if (userPp && userPp != 'user_profiles/ppDefault') {
        cloudinary.uploader.destroy(userPp, (err, result) => {
          if (err) {
            res.status(500).json({
              message: "Previous profile picture couldn't be deleted",
              err,
            });
            return;
          }
        });
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
