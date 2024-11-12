'use client'

import Logout from "../authentification/Logout";
import { useAuth } from "@/app/context/Authorization";



export default function Header(){

    const {isAuthentificated} = useAuth()
    
    if(!isAuthentificated){
        return null
    }
    return ( 
        <header>
           <div>
            <Logout />
           </div>
        </header>
    )
}