import Image from 'next/image';

import styles from '@/app/styles/movieCard.module.scss';
import { SetStateAction, useState } from 'react';
import MovieRating from './MovieRating';
import UpdateMovieList from './UpdateMovieList';

export default function MovieCardL(props: {
  movie: MovieType;
  movieCast: MovieCastType;
}) {
  const movie = props.movie;
  const movieCast = props.movieCast;
  const moviePoster =
    `https://image.tmdb.org/t/p/original/` + movie.poster_path;
  const movieReleaseDateUs = new Date(movie.release_date);
  const movieReleaseDateFr = Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(movieReleaseDateUs);
  const movieRate = parseInt(movie.popularity) / 10;

  const [rating, setRating] = useState(Number)
  const [updateFavorites, setUpdateFavorites] = useState(Boolean)
  const [updateWatched, setUpdateWatched] = useState(Boolean)

  const handleRating = (newRating: SetStateAction<number>) => {
    setRating(newRating)
  }
  const handleUpdateFavorites = (newRating: SetStateAction<boolean> ) => {
    setUpdateFavorites(newRating)
  }
  const handleUpdateWatched = (newRating: SetStateAction<boolean> ) => {
    setUpdateWatched(newRating)
  }

  return (
    <div className={`${styles.cardL} m-2 md:ml-12`}>
      <div className={`${styles.cardL_Details}`}>
        <div className={`${styles.cardL_Poster}`}>
          <Image
            src={moviePoster}
            alt="Affiche du film"
            width={500}
            height={500}
          />
        </div>
        <div className={`${styles.cardL_Title}`}>
          <h3>{movie.title}</h3>
          <span>Sortie le {movieReleaseDateFr}</span>
        </div>
        <div className={`${styles.cardL_Content}`}>
          <p>
            Genre :&nbsp;
            {movie.genres.map((genre, i: number) => (
              <>
                {i > 0 ? ', ' : null}
                {genre.name}
              </>
            ))}
          </p>
          <p>
            Réalisé par&nbsp;
            {movieCast.directors.map((director: CastType, i: number) => (
              <>
                {i > 0 ? ',' : null}
                {director.name}
              </>
            ))}
          </p>
          <p>
            Casting :&nbsp;
            {movieCast.mainCast.map((actor: CastType, i: number) => (
              <>
                {' '}
                {i > 0 ? ',' : null} {actor.name}
              </>
            ))}
          </p>
          <p>Note :&nbsp;{movieRate}/10 </p>
          <div className='flex flex-col'>
          <div className='flex  my-3 md:mt-11'>
          <UpdateMovieList 
          movieList="watchlist"
          buttonMessage={["+ film à voir","- films à voir"]}
          movieId = {movie.id}
          />
          <UpdateMovieList 
          movieList="watchedmovies"
          buttonMessage={["+ film vu","- film vu"]}
          movieId = {movie.id}
          setRating={handleRating}
          setUpdateFavorites={handleUpdateFavorites}
          updateFavorites={updateFavorites}
          updateWatched={updateWatched}
          />
          <UpdateMovieList 
          movieList='favoritesmovies'
          movieId={movie.id}
          updateFavorites={updateFavorites}
          setUpdateWatched={handleUpdateWatched}
          updateWatched={updateWatched}
          />
          </div>
          <div className='mx-3 mt-4'>
            <MovieRating 
            rating={rating} 
            setRating={handleRating} 
            movieId={movie.id}
            setUpdateWatched={handleUpdateWatched}
            updateWatched={updateWatched}
            
            />
          </div>
          </div>
        </div>
        <div className={`${styles.cardL_Synopsis}`}>
          <h4>Synopsis</h4>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
