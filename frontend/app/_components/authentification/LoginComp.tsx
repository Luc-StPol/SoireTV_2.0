"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loginUser } from "@/lib/api/authentification";
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/Authorization";

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

    return <div>
        <form method="post" onSubmit={handleLoginUser}>
            <div>
                <label>Email</label>
                <input type="email" name="userEmail" id="email" onChange={handleChange} />
            </div>
            <div>
                <label>Mot de passe</label>
                <input type="password" name="userPassword" onChange={handleChange}/>
            </div>
            <div>
            <Button type="submit">Se connecter</Button>
        </div>
        </form>
        
    </div>
}