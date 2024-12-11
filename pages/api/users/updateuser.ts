import { NextApiRequest, NextApiResponse } from 'next';

export default function updateUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // W.I.P.
}
