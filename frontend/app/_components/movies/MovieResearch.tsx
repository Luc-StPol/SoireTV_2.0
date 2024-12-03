'use client'

import { useResearchData } from "@/app/context/ResearchData"
import { searchMovies } from "@/lib/api/movies"
import { JSX, useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import Link from "next/link"

interface MoviesListType {
    map(arg0: (movie: MovieType) => JSX.Element): import("react").ReactNode
    moviesList: string[]
}
export default function MovieResearch(){

    const {researchName} = useResearchData()
    const [moviesList, setMoviesList] = useState<MoviesListType>()

    useEffect(() => {
        const fetchMovies = async() => {
            try {
                if(!researchName){
                    return
                }
                const response = await searchMovies(researchName)
                setMoviesList(response.results)
            }catch(err){
                console.log('Error fetching movies:', err)
            }
        }
        fetchMovies()
    }, [researchName])
    
    if(!moviesList){
        return null
    }

    return (   
        <div className="grid md:grid-cols-3 lg:grid-cols-4 md:gap-28 md:m-9 max-md:justify-center my-8">
           {
            moviesList.map((movie: MovieType) => (
                <Link key={movie.id} href={`/moviePage/${movie.id}`}>
                <MovieCard movie = {movie} />
                </Link>
            ))
           }
        </div>
    )
}