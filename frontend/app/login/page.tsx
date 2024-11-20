import LoginComp from "../_components/authentification/LoginComp";
import Image from "next/image";
import Logo from "@/public/images/SoireeTV_Icone-removebg-transformed.png"
import styles from "@/app/styles/component.module.scss"

export default function Login(){
    return (
        <div className={styles.authentificationBackground}> 
        <div className="flex flex-col">
        <div className="max-md:order-2">
        <LoginComp/>
        </div>
        <div className="flex flex-col items-center max-md:order-1">
        <Image src={Logo} alt="logo canapé" width={750} className="m-8 max-md:w-80 max-md:order-2"/>
        <h1 className="max-md:text-8xl max-md:m-8">Soirée TV</h1>
        </div>
        </div>
    </div>
    )
     
}