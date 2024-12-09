import fs from 'fs';

import formidable, { Fields, Files } from 'formidable';
import { NextApiRequest } from 'next';

// Désactiver le parsing automatique de body pour Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// Middleware de parsing
export const formidableMiddleware = (
  req: NextApiRequest,
  uploadDir: string,
): Promise<{ fields: Fields; files: Files }> => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    multiples: false, // Activer si plusieurs fichiers sont permis
    uploadDir,
    keepExtensions: true, // Conserve les extensions des fichiers
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
