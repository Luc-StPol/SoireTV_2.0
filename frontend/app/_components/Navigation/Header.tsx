'use client'

import Logout from "../authentification/Logout";
import { useAuth } from "@/app/context/Authorization";
import Link from "next/link";
import ResearchMovie from "../research/ReasearchMovie";
import ResearchFriend from "../research/ReasearchFriend";
import styles from "@/app/styles/component.module.scss"
import Image from "next/image";
import logo from "@/public/images/SoireeTV_Icone-removebg-transformed.png"
import ppDefault from "@/public/images/ppDefault.png"

export default function Header(){

    const {isAuthentificated} = useAuth()
    
    if(!isAuthentificated){
        return null
    }
    return ( 
        <div>
        <header className={styles.header}>
            <div className="flex">
                <Link href='/'><Image src={logo} alt="logo canapé" width={200} className="ml-9"/></Link>
            </div>
            <div className="flex">
                <ResearchMovie />
                <ResearchFriend />
            </div>
            <nav className="flex items-center">
                <Link href='/'><Image src={ppDefault} alt="photo de profil" width={110} /></Link>
                <Logout />
            </nav>
        </header>
        </div>
    )
}