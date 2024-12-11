'use client';

import Link from 'next/link';
import { JSX, useEffect, useState } from 'react';

import { useResearchData } from '@/app/context/ResearchData';
import { searchMovies } from '@/lib/api/movies';

import MovieCard from './MovieCard';

interface MoviesListType {
  map(arg0: (movie: MovieType) => JSX.Element): import('react').ReactNode;
  moviesList: string[];
}
export default function MovieResearch() {
  const { researchName } = useResearchData();
  const [moviesList, setMoviesList] = useState<MoviesListType>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!researchName) {
          return;
        }
        const response = await searchMovies(researchName);
        setMoviesList(response.results);
      } catch (err) {
        console.log('Error fetching movies:', err);
      }
    };
    fetchMovies();
  }, [researchName]);

  if (!moviesList) {
    return null;
  }

  return (
    <div className="my-8 grid max-md:justify-center md:m-9 md:grid-cols-3 md:gap-28 lg:grid-cols-4">
      {moviesList.map((movie: MovieType) => (
        <Link key={movie.id} href={`/moviePage/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}
