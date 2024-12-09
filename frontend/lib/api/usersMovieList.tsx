import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MovieList {
    userId: string
    movieId: string
    typeList: string
}

export const addMovie = async(userData: MovieList) => {
    const response = await axios.post(`${API_URL}/userMovies/addtomovielist`,{
        userId: userData.userId,
        movieId: userData.movieId,
        typeList: userData.typeList
    }
    )
    return response.data
}

export const getMovieList = async(userData: MovieList) => {
    const response = await axios.post(`${API_URL}/userMovies/getfrommovielist`,{
        userId: userData.userId,
        typeList: userData.typeList
    }
    )
    return response.data
}

export const deleteMovie = async(userData: MovieList) => {
    const response = await axios.post(`${API_URL}/userMovies/removefrommovielist`,{
        userId: userData.userId,
        movieId: userData.movieId,
        typeList: userData.typeList
    }
    )
    return response.data
}