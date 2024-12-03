'use client'

import styles from '@/app/styles/researchBar.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useResearchData } from '@/app/context/ResearchData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

export default function ResearchBar(props: {placeholder: string, link:string}){

    const router = useRouter()
    const [researchName, setResearchName] = useState<string>()
    const {getResearchName} = useResearchData()

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if(!researchName){
            return
        }
        router.push(props.link) // to do : add path to parent
        getResearchName(researchName)
    }
    

    return (
        <div className={styles.searchBar}>
            <form method='post' onSubmit={handleSubmit}>
                <div className={styles.searchBarInput}>
                    <input type="search" placeholder={props.placeholder} onChange={(e)=>setResearchName(e.target.value)}/>
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
            </form>
        </div>
    )
}