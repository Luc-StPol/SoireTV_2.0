'use client'

import { useAuth } from "@/app/context/Authorization";
import Link from "next/link";
import ResearchMovie from "../research/ReasearchMovie";
import ResearchFriend from "../research/ReasearchFriend";
import styles from "@/app/styles/component.module.scss"
import Image from "next/image";
import logo from "@/public/images/SoireeTV_Icone-removebg-transformed.png"
import ppDefault from "@/public/images/ppDefault.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header(){

    const {isAuthentificated} = useAuth()
    
    if(!isAuthentificated){
        return null
    }
    return ( 
        <div>
        <header className={`${styles.header} max-md:flex-col max-md:h-36 max-md:static`}>
            <div className="flex items-center max-md:w-11/12 justify-center">
                <div className="md:hidden w-14 h-14 mr-8">
                    <FontAwesomeIcon icon={faBars} className="w-full h-full"/>
                </div>
                <Link href='/'><Image src={logo} alt="logo canapé" width={200} className="md:ml-2 max-md:w-28 max-md:mr-6"/></Link>
                <h1 className="text-3xl md:hidden">Soirée TV</h1>
            </div>
            <div className="flex max-md:w-full max-md:justify-center">
                <div className="max-md:w-11/12">
                <ResearchMovie />
                </div>
                <div className="max-md:hidden">
                <ResearchFriend />
                </div>
            </div>
            <nav className="flex items-center max-md:hidden">
                <Link href='/'><Image src={ppDefault} alt="photo de profil" width={110} /></Link>
            </nav>
            
        </header>
        
        </div>
    )
}