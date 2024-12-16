import { compare, hash } from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

import asyncDb from '@/lib/asyncDb';
import db from '@/lib/db';

interface UserData extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

interface User {
  userId: string;
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}

export default async function editInformation(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const {
      userId,
      email,
      name,
      oldPassword,
      newPassword: plainPassword,
    }: User = req.body;

    console.log(userId);
    const queryParts: string[] = [];
    const queryParams: string[] = [];

    if (email) {
      //Email test
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validateEmail = (email: string): boolean => emailRegex.test(email);
      if (!validateEmail(email)) {
        res.status(400).json('Invalid email');
      } else {
        queryParts.push('email = ?');
        queryParams.push(email);
      }
    }

    if (oldPassword && plainPassword) {
      const password = await hash(plainPassword, 10);

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const validatePassword = (oldPassword: string): boolean =>
        passwordRegex.test(oldPassword);
      if (!validatePassword(oldPassword)) {
        res.status(400).json('Password must meet security requirements');
      }

      const matchPassword = async () => {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [results] = await asyncDb.query<UserData[]>(query, [userId]);

        console.log('results:', results);

        const user: UserData = results[0];

        const isMatch = await compare(oldPassword, user.password);

        return isMatch;
      };

      const isMatch = await matchPassword();

      if (!isMatch) {
        res.status(401).json('Password does not match');
        return false;
      } else {
        queryParts.push('password = ?');
        queryParams.push(password);
      }
    }

    if (name) {
      queryParts.push('name = ?');
      queryParams.push(name);
    }

    const query = `UPDATE users SET ${queryParts.join(', ')} WHERE id = ${userId}`;
    queryParams.push(userId);

    db.query(query, queryParams, (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          errno: err.errno,
        });
        return;
      } else {
        console.log('query is:', queryParts, queryParams);
        res.status(200).json({
          message: 'user update !',
          results,
        });
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
