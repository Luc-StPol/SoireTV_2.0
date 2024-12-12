import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/db';

interface UserData extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

export default function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json('Email or password missing');
    return;
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results: UserData[]) => {
    if (err) {
      res.status(500).json({
        message: 'Login error',
        error: err.message,
        errno: err.errno,
      });
      return;
    }
    if (!results) {
      res.status(404).json('User not found');
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch: boolean) => {
      if (err) {
        res.status(500).json({ message: 'Error:', err });
        return;
      }
      if (isMatch) {
        const token = jwt.sign({ id: user.id }, 'N}98Xs)i5N5;zc', {
          expiresIn: '24h',
        });
        res.status(200).json({
          message: 'Login successful',
          user: {
            id: user.id,
            email: user.email,
            token,
          },
        });
      } else {
        res.status(401).json('Incorrect password');
      }
    });
  });
}
