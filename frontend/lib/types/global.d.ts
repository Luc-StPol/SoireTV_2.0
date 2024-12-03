
declare global {

    interface MovieType {
        id: string
        title: string
        poster_path: string
        release_date: string
        overview: string
        genres: [GenreType]
        popularity: string
    }
    interface GenreType {
        id: string
        name: string
    }

    interface MovieCastType {
        mainCast: string[CastType]
        directors: string[CastType]
    }
    interface CastType {
        id: string
        name: string
    }

}

export {}

