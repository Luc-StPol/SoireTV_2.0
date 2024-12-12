import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MovieList {
  userId: string;
  movieId?: string;
  typeList?: string;
  rating?: number;
}

export const addMovie = async (data: MovieList) => {
  const response = await axios.post(`${API_URL}/usermovies/addtomovielist`, {
    userId: data.userId,
    movieId: data.movieId,
    typeList: data.typeList,
  });
  return response.data;
};

export const getFromMovieList = async (data: MovieList) => {
  const response = await axios.post(`${API_URL}/usermovies/getfrommovielist`, {
    userId: data.userId,
    typeList: data.typeList,
  });
  return response.data;
};

export const getMovieList = async (data: MovieList) => {
  const response = await axios.post(`${API_URL}/usermovies/getmovielist`, {
    userId: data.userId,
    typeList: data.typeList,
  });
  return response.data;
};

export const getMovie = async (data: MovieList) => {
  const response = await axios.post(`${API_URL}/usermovies/getmovie`, {
    userId: data.userId,
    movieId: data.movieId,
    typeList: data.typeList,
  });
  return response.data;
};

export const getBestMovies = async (userId: string) => {
  const response = await axios.get(
    `${API_URL}/usermovies/getbestmovies/${userId}`,
  );
  return response.data;
};

export const getRating = async (data: MovieList) => {
  const response = await axios.post(`${API_URL}/usermovies/getrating`, {
    userId: data.userId,
    movieId: data.movieId,
  });
  return response.data;
};

export const addRating = async (data: MovieList) => {
  const response = await axios.post(`${API_URL}/usermovies/addrating`, {
    userId: data.userId,
    movieId: data.movieId,
    rating: data.rating,
  });
  return response.data;
};

export const deleteMovie = async (data: MovieList) => {
  const response = await axios.post(
    `${API_URL}/usermovies/removefrommovielist`,
    {
      userId: data.userId,
      movieId: data.movieId,
      typeList: data.typeList,
    },
  );
  return response.data;
};
