import { getMovieList } from "@/lib/api/usersMovieList"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import GetMovie from "./GetMovie"

interface MovieList {
    map(arg0: (movie: Movie) => JSX.Element): import('react').ReactNode;
  moviesList: string[];
}

interface Movie {
    movieId: string
}

export default function GetMovieList(props:{typeList: string}){
    

    const userId = Cookies.get('userId')
    const typeList = props.typeList
    const [movies, setMovies] = useState<MovieList>()
    if(!userId){
        return
    }
    const data = {userId, typeList}

    useEffect(() => {
        const fetchMovies = async() => {
            const response = await getMovieList(data)
            setMovies(response.results)
        }
        fetchMovies()
    }, [])

    if(!movies){
        return <div><FontAwesomeIcon icon={faSpinner} /></div>
    }

    return (
        <div className="flex md:flex-wrap md:m-11 max-md:flex-col items-center md:items-start">
            {
                movies.map((movie) => (
                    <GetMovie movie={movie} />
                ))
            }
        </div>
    )
}