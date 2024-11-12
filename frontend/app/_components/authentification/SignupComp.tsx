"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { addUser } from "@/lib/api/authentification"
import { useRouter } from "next/router"

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
        <div>
            <form method="post" onSubmit={handleAddUser}>
            <div>
                <label>Email</label>
                <input type="email" name="userEmail" id="email" onChange={handleChange}/>
            </div>
            <div>
                <label>Prénom</label>
                <input type="text" name="userName" onChange={handleChange} />
            </div>
            <div>
                <label>Mot de passe</label>
                <input type="password" name="userPassword" onChange={handleChange} />
            </div>
            <div>
            <Button type="submit">S&apos;inscrire</Button>
        </div>
        </form>
        
        </div>
    )
}