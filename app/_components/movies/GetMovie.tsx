'use client';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getMovie } from '@/lib/api/movies';

import MovieCard from './MovieCard';

interface Movie {
  movieId: string;
}

export default function GetMovie(props: { movie: Movie }) {
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await getMovie(props.movie.movieId);
      if (response) {
        setMovie(response);
      }
    };
    fetchMovie();
  });

  if (!movie) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    );
  }

  return (
    <div className="mx-2">
      <Link href={`/moviePage/${movie.id}`}>
        <MovieCard movie={movie} />
      </Link>
    </div>
  );
}
