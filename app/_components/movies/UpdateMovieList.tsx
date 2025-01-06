'use client';

import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import {
  addMovie,
  deleteMovie,
  getMovie,
  getRating,
} from '@/lib/api/usersMovieList';

interface propsType {
  setRating?(fetchRating: number): void;
  setUpdateFavorites?(updateFavorites: boolean): void;
  updateFavorites?: boolean;
  setUpdateWatched?(updateFavorites: boolean): void;
  updateWatched?: boolean;
  movieList: string;
  movieId: string;
  buttonMessage?: string[];
}

export default function UpdateMovieList(props: propsType) {
  const [n, setN] = useState(0); // 0: Movie isn't added / 1: Movie is already added to the list
  const session = useSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
    const isMovieExist = async () => {
      if (!userId) {
        return null;
      }
      const data = {
        userId: userId,
        movieId: props.movieId,
        typeList: props.movieList,
      };
      const response = await getMovie(data);
      if (response === false) {
        setN(0);
        if (props.setRating) {
          props.setRating(0);
        }
      } else {
        setN(1);
        if (props.movieList === 'watchedmovies' && props.setRating) {
          const fetchRating = await getRating(data);
          props.setRating(fetchRating.results[0].rating);
        }
      }
    };
    isMovieExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update favoritesmovies icon if movie is deleted from watched list
    if (props.movieList === 'favoritesmovies' && n === 1) {
      setN(0);
      console.log(`For ${props.movieList} n set to ${n}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateFavorites]);

  useEffect(() => {
    // Update watchedmovies button if movie is added to favorite list
    if (props.movieList === 'watchedmovies' && n === 0) {
      setN(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateWatched]);

  const handleClick = async () => {
    if (!userId) {
      return null;
    }
    const data = {
      userId: userId,
      movieId: props.movieId,
      typeList: props.movieList,
    };
    if (n === 0) {
      const response = await addMovie(data);
      if (response) {
        setN(1); // Add movie
        if (props.movieList == 'favoritesmovies' && props.setUpdateWatched) {
          props.setUpdateWatched(!props.updateWatched);
        }
      }
    } else {
      const response = await deleteMovie(data);
      if (response) {
        setN(0); // Delete movie
        if (props.setRating) {
          props.setRating(0);
        }
        if (props.movieList === 'watchedmovies' && props.setUpdateFavorites) {
          props.setUpdateFavorites(!props.updateFavorites);
        }
      }
    }
  };

  if (props.movieList === 'favoritesmovies' && !props.buttonMessage) {
    return (
      <button
        className="flex items-center rounded-full border-2 border-solid border-black px-3 text-2xl hover:cursor-pointer md:mx-2"
        onClick={handleClick}
        style={{ backgroundColor: 'white' }}
      >
        {n === 0 ? (
          <FontAwesomeIcon icon={faHeartRegular} />
        ) : (
          <FontAwesomeIcon icon={faHeartSolid} />
        )}
      </button>
    );
  }

  if (props.buttonMessage) {
    return (
      <div>
        <button className="mx-3 w-32" onClick={handleClick}>
          {props.buttonMessage[n]}
        </button>
      </div>
    );
  }
}
