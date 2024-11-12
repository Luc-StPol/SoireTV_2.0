'use client'

import { Button } from "@/components/ui/button";
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
        <Button onClick={logoutUser}>Se déconnecter</Button>
    )
}