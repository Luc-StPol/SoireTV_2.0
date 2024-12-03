import axios from "axios"

const bearer = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjIwMzgzYTM1ZWQ1ZTkyZDg0OWEyOWNhNTg5ZTBjYSIsIm5iZiI6MTczMjEwMjExNS40MTc2NTQzLCJzdWIiOiI2NzNkYzY0MDdlMWMyMWUxNjgzMjE0NzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ukoX9e3NfBb2vdSEwtXY1okxWP4TilaGdYvUg06t4BE'

const getResponse = async (url: string) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: bearer
        }
    })
    return response.data
}

export const searchMovies = async (movieName?: string) => {
    if(!movieName){
        return null
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=fr&page=1`
    const response = await getResponse(url)
    return response
}

export const getMovie = async (movieId: string) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=fr`
    const response = await getResponse(url)
    return response
}

export const getMainCasting = async (movieId: string) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr`
    const response = await getResponse(url)
    const mainCast = response.cast.slice(0,5)
    const directors = response.crew.filter((item: { job: string }) => item.job === "Director" )
    const respondeData = {
        mainCast: mainCast,
        directors: directors
    }

    return respondeData
}