import Image from 'next/image';

import styles from '@/app/styles/movieCard.module.scss';

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

  console.log(movie);

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
        </div>
        <div className={`${styles.cardL_Synopsis}`}>
          <h4>Synopsis</h4>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
