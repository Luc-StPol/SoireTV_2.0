'use client';

import { ParsedUrlQuery } from 'querystring';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getMainCasting, getMovie } from '@/lib/api/movies';

import MovieCardL from './MovieCardL';

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function MovieProfil() {
  const router = useRouter();
  const { movieId } = router.query as Params;
  const [movie, setMovie] = useState<MovieType>();
  const [movieCast, setMovieCast] = useState<MovieCastType>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!movieId) {
          return <div>Film introuvable</div>;
        }
        if (typeof movieId === 'string') {
          const response = await getMovie(movieId);
          setMovie(response);
          const responseCast = await getMainCasting(movieId);
          setMovieCast(responseCast);
        }
      } catch (err) {
        console.log('Error fetching movie', err);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie || !movieCast) {
    return <div>Ups ! il semble que le film n&apos;est pas été trouvé</div>;
  }

  return <MovieCardL movie={movie} movieCast={movieCast} />;
}
