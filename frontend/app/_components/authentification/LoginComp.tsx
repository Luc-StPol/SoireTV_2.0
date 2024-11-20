"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api/authentification";
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/Authorization";
import styles from '@/app/styles/form.module.scss'
import Link from "next/link";

export default function LoginComp(){

    const router = useRouter()
    const {login} = useAuth()
    const [userData, setUserData] = useState({
        userEmail: '',
        userPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })

    }

    const handleLoginUser = async (e: { preventDefault: () => void; }) => {
       e.preventDefault()
        try {
            const response = await loginUser(userData)
            const token = response.user.token
            login(token)
            router.push('/')
        } catch(err){
            console.log("erreur de connexion", err)
        }
    }

    return <div className={`${styles.formContainer} justify-center`}>
        <form method="post" onSubmit={handleLoginUser}>
            <div className="flex items-center max-md:flex-col">
                <div className={styles.formInput}>
                    <input type="email" name="userEmail" id="email" onChange={handleChange} placeholder="Email"/>
                </div>
                <div className={styles.formInput}>
                    <input  type="password" name="userPassword" onChange={handleChange} placeholder="Mot de passe"/>
                </div>
                <div className={styles.formButton}>
                    <button type="submit">Se connecter</button>
                </div>
            </div>
            <div className="flex my-4 justify-center max-md:flex-col max-md:text-center">
                <p className="mx-3 max-md:m-4">Pas encore de compte ?</p>
                <Link href='/signup' className="text-blue-500">Inscrivez-vous ici</Link>
            </div>
        </form>
        
    </div>
}