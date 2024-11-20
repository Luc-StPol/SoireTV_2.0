import axios from "axios"

const bearer = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjIwMzgzYTM1ZWQ1ZTkyZDg0OWEyOWNhNTg5ZTBjYSIsIm5iZiI6MTczMjEwMjExNS40MTc2NTQzLCJzdWIiOiI2NzNkYzY0MDdlMWMyMWUxNjgzMjE0NzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ukoX9e3NfBb2vdSEwtXY1okxWP4TilaGdYvUg06t4BE'


export const searchMovies = async (movieName?: string) => {
    if(!movieName){
        return null
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=fr&page=1`
    const response = await axios.get(url, {
        headers: {
            Authorization: bearer
        }
    })
    return response.data
}