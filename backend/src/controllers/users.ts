import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { RequestHandler, Request, Response } from 'express';
import mysql from 'mysql2';

export const signup: RequestHandler = async (req: Request, res: Response) => {
  
    const {name, email, password: plainPassword} = req.body

    //hash password
    const password = await bcrypt.hash(plainPassword, 10)

    //Email test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validateEmail = (email: string): boolean => emailRegex.test(email)

    //Password test
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validatePassword = (password: string) : boolean => passwordRegex.test(password)

    //Email & password validation
    if(!email || !plainPassword){
        res.status(400).json('Email or password missing')
        return
    }
    if(!validateEmail(email)){
        res.status(400).json('Invalid email')
    }
    if(!validatePassword(plainPassword)){
        res.status(400).json('Password must meet security requirements')
    }
    //Insert into DB
    const query = 'INSERT INTO users (email, password, name) VALUES (?,?,?)';
    req.db.query(query, [email, password, name], (err: mysql.QueryError | null) => {
      console.log("étape 3 passée")
        if(err){
            res.status(500).json({
                message: 'Signup error',
                error: err.message,
                errno: err.errno,
            })
            return
        }
        res.status(201).json({message : 'User added'})
    })
    
}

export const login: RequestHandler = (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json('Email or password missing');
      return;
    }
  
    const query = 'SELECT * FROM users WHERE email = ?';
    req.db.query(query, [email], (err: mysql.QueryError | null, results: any) => {
      if (err) {
        res.status(500).json({
          message: 'Login error',
          error: err.message,
          errno: err.errno,
        });
        return;
      }
      if (results.length === 0) {
        res.status(401).json('User not found');
        return;
      }
  
      const user = results[0];
      bcrypt.compare(password, user.password, (err: Error | undefined, isMatch: boolean) => {
        if (err) {
          res.status(500).json({ message: 'Error:', err });
          return;
        }
        if (isMatch) {
          const token = jwt.sign({ id: user.id }, 'N}98Xs)i5N5;zc', { expiresIn: '24h' });
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
  };