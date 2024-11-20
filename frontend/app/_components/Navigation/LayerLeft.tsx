'use client'

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import styles from "@/app/styles/component.module.scss"
import Link from "next/link";
import { useAuth } from "@/app/context/Authorization";

export default function LayerLeft(props: { children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }){
    
    const {isAuthentificated} = useAuth()
    
    if(!isAuthentificated){
        return <div>
            {props.children}
        </div>
    }

    return (
        <div className="flex">
            <div className={`h-[calc(100vh-105px)] w-1/6 border-e-8 border-primary h-1/1 relative ${styles.leftHeader}`}>

            </div>
            <div>
            <div className={styles.onglet}>
            <Link href='/'>Film à voir</Link>
            <Link href='/'>Vos Favoris</Link>
            <Link href='/'>Actualitées</Link>
        </div>
            {props.children}
            </div>
        </div>
    )
}
