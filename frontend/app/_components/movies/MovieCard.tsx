
import Image from "next/image"
import styles from "@/app/styles/movieCard.module.scss"


export default function MovieCard(props: { movie: MovieType }){

    const movie = props.movie
    const moviePoster = `https://image.tmdb.org/t/p/w500/` + movie.poster_path

    return (
        <div className={styles.cardSm}>
            <div className={styles.cardPoster}>
                <Image src={moviePoster} alt='affiche du film' width={500} height={500} />
            </div>
            <div className={styles.cardTitle}>
                {movie.title}
            </div>
        </div>
    )
}