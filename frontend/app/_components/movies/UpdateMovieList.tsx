import { addMovie, deleteMovie, getMovie, getRating } from "@/lib/api/usersMovieList";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface propsType {
    setRating?(fetchRating: number ): void;
    setUpdateFavorites?(updateFavorites: boolean): void
    updateFavorites?: boolean
    setUpdateWatched?(updateFavorites: boolean): void
    updateWatched?: boolean
    movieList: string
    movieId: string
    buttonMessage?: string[]
}

export default function UpdateMovieList(props: propsType){

    const [n, setN] = useState(0) // 0: Movie isnt  add / 1: Movie is already add to the list
    
    const userId = Cookies.get('userId');
    
    if(!userId){
        return null
    }
    const data = {
        userId: userId,
        movieId: props.movieId,
        typeList: props.movieList
    }

    useEffect(() => {
        const isMovieExist = async() => {
            const response = await getMovie(data)
            if(response === false){
                setN(0)
                if(props.setRating){
                    props.setRating(0)
                }
            }else {
                setN(1)
                if(props.movieList === "watchedmovies" && props.setRating){
                    const fetchRating = await getRating(data)
                    props.setRating(fetchRating.results[0].rating)
                }
            }
        }
        isMovieExist()
    }, [])

    useEffect(() => {
        // Update favoritesmovies icon if movies is deleted from watched list
        if(props.movieList === "favoritesmovies" && n === 1){
            console.log("n set to 0")
            setN(0)
        }
    }, [props.updateFavorites])
    
    useEffect(() => {
        // Update watchedmovies button if movies is add to favorit list
        if(props.movieList === "watchedmovies" && n === 0){
            console.log("n set to 1")
            setN(1)
        }
    }, [props.updateWatched])

    const handleClick = async () => {
        if(n === 0){
            const response = await addMovie(data)
            if(response){
                setN(1) // Add movie
                if(props.movieList == "favoritesmovies" && props.setUpdateWatched) {
                    props.setUpdateWatched(!props.updateWatched)
                }
            }
        } else {
            const response = await deleteMovie(data)
            if(response){
                setN(0) // Delete movie
                if(props.setRating){
                    props.setRating(0)
                }
                if(props.movieList === "watchedmovies" && props.setUpdateFavorites){
                    props.setUpdateFavorites(!props.updateFavorites)
                }
            }
        }
    }

     if(props.movieList === "favoritesmovies" && !props.buttonMessage ) {
        return (
            <div className="flex items-center border-2 border-solid border-black rounded-full px-3 md:mx-2 hover:cursor-pointer text-2xl">
                {
                    n === 0 ? (
                        <FontAwesomeIcon icon={faHeartRegular} onClick={handleClick}/>
                    ) : (
                        <FontAwesomeIcon icon={faHeartSolid} onClick={handleClick}/>
                    )
                }
             
         </div>
        )  
     }

     if(props.buttonMessage){
        return (
            <div>
                <button className="mx-3 w-32" onClick={handleClick}>{props.buttonMessage[n]}</button>
            </div>
        )
     }

}