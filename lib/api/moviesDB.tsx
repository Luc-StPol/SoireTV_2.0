import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MovieList {
  userId: string;
  typeList?: string;
}

export const getMoviesFromList = async (data: MovieList) => {
  const response = await axios.post(`${API_URL}/movies/getmoviefromlist`, {
    userId: data.userId,
    typeList: data.typeList,
  });
  return response.data;
};
