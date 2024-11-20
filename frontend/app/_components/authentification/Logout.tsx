'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/Authorization";

export default function Logout(){
    const router = useRouter()
    const {logout} = useAuth()
    const logoutUser = () => {
        logout()
        router.push('/login')
    }
    return (
        <button className="h-14 mx-8" onClick={logoutUser}>Se déconnecter</button>
    )
}