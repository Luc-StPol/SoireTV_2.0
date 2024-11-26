'use client'

import styles from '@/app/styles/researchBar.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useResearchData } from '@/app/context/ResearchData'

export default function ResearchBar(){

    const router = useRouter()
    const [researchName, setResearchName] = useState<string>()
    const {getResearchName} = useResearchData()

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if(!researchName){
            return
        }
        router.push('/movieResearchList')
        getResearchName(researchName)
    }
    

    return (
        <div className={styles.searchBar}>
            <form method='post' onSubmit={handleSubmit}>
            <input type="search" placeholder='search' onChange={(e)=>setResearchName(e.target.value)}/>
            <button>Search</button>
            </form>
        </div>
    )
}