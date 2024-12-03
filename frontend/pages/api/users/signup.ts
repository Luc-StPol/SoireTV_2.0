import db from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'

interface User {
    name: string
    email: string
    password: string
}

export default async function signup (req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST'){

    const {name, email, password: plainPassword}: User = req.body

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
    db.query(query, [email, password, name], (err) => {
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
}