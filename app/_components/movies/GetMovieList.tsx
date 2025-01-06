'use client';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
// eslint-disable-next-line import/order
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getMoviesFromList } from '@/lib/api/moviesDB';

import MovieCard from './MovieCard';

interface MovieList {
  map(arg0: (movie: Movie) => JSX.Element): import('react').ReactNode;
  moviesList: string[];
  genres: string[];
  popularity: number;
}

interface Movie {
  movieId: string;
  id: string;
  title: string;
  poster_path: string;
}

export default function GetMovieList(props: { typeList: string }) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const typeList = props.typeList;
  const [movies, setMovies] = useState<MovieList>();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!userId) {
        return;
      }
      const data = { userId, typeList };
      const response = await getMoviesFromList(data);
      setMovies(response.movies);
    };
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div key={movie.movieId} className="mx-2">
          <Link href={`/moviePage/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
      ))}
    </div>
  );
}
