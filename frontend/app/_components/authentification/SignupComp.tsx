"use client";

import { useState } from "react"
import { addUser } from "@/lib/api/authentification"
import { useRouter } from "next/navigation"
import styles from '@/app/styles/form.module.scss'

export default function SignupComp(){

    const router = useRouter()
    const [userData, setUserData] = useState({
        userEmail: '',
        userPassword: '',
        userName: ''
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })

    }

    const handleAddUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
         try {
             const response = await addUser(userData)
             console.log('User added', response.data)
             router.push('/')
         } catch(err){
             console.log("erreur de connexion", err)
         }
     }

    return (
        <div className={`${styles.formContainer} flex-col items-center`}>
            <h3>Créer un compte</h3>
            <form method="post" onSubmit={handleAddUser} >
            <div className={styles.formInput}>
                <input type="email" name="userEmail" id="email" onChange={handleChange} placeholder="Email"/>
            </div>
            <div className={styles.formInput}>
                <input type="text" name="userName" onChange={handleChange} placeholder="Nom d'utilisateur" />
            </div>
            <div className={styles.formInput}>
                <input type="password" name="userPassword" onChange={handleChange} placeholder="Mot de passe" />
            </div>
            <div className={`${styles.formButton} justify-center m-11`}>
            <button type="submit">S&apos;inscrire</button>
            </div>
        </form>
        
        </div>
    )
}