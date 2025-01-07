'use client';

import { useEffect, useState } from 'react';

import { getBestMovies } from '@/lib/api/usersMovieList';

import GetMovie from '../movies/GetMovie';

interface MovieList {
  length: number;
  map(arg0: (movie: Movie) => JSX.Element): import('react').ReactNode;
  moviesList: string[];
}

interface Movie {
  movieId: string;
}

export default function UserBestMovies(props: { userId: string }) {
  const [movieList, setMovieList] = useState<MovieList>();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await getBestMovies(props.userId);
      setMovieList(response);
    };
    fetchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!movieList) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="mt-12">
      <h4>Films favoris</h4>
      <div className="md:flex">
        {movieList.length === 0 && (
          <div>
            <p>Aucun film en favoris pour l&apos;instant</p>
          </div>
        )}
        {movieList.map((movie: Movie) => (
          <div key={movie.movieId}>
            <GetMovie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
