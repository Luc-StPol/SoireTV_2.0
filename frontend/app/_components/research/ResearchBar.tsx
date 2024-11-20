'use client'

import styles from '@/app/styles/researchBar.module.scss'
import { searchMovies } from '@/lib/api/movies'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResearchBar(){

    const router = useRouter()
    const [movieName, setMovieName] = useState<string>()

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            console.log(movieName)
            const response = await searchMovies(movieName)
            console.log(response)
            router.push('/movieResearchList')
        } catch (err) {
            console.log("erreur lors de la recherche:", err)
        }
        
    }

    return (
        <div className={styles.searchBar}>
            <form method='post' onSubmit={handleSubmit}>
            <input type="search" placeholder='search' onChange={(e)=>setMovieName(e.target.value)}/>
            <button>Search</button>
            </form>
        </div>
    )
}