'use client';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { getMovieList } from '@/lib/api/usersMovieList';

import GetMovie from './GetMovie';

interface MovieList {
  map(arg0: (movie: Movie) => JSX.Element): import('react').ReactNode;
  moviesList: string[];
}

interface Movie {
  movieId: string;
}

export default function GetMovieList(props: { typeList: string }) {
  const userId = Cookies.get('userId');
  const typeList = props.typeList;
  const [movies, setMovies] = useState<MovieList>();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!userId) {
        return;
      }
      const data = { userId, typeList };
      const response = await getMovieList(data);
      setMovies(response.results);
    };
    fetchMovies();
  });

  if (!movies) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    );
  }

  return (
    <div className="flex items-center max-md:flex-col md:m-11 md:flex-wrap md:items-start">
      {movies.map((movie) => (
        <div key={movie.movieId}>
          <GetMovie movie={movie} />
        </div>
      ))}
    </div>
  );
}
