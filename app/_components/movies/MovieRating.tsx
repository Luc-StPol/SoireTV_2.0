'use client';

import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { addRating } from '@/lib/api/usersMovieList';

interface propsType {
  setRating(fetchRating: number): unknown;
  rating: number;
  movieId: string;
  setUpdateWatched(updateFavorites: boolean): void;
  updateWatched: boolean;
}

interface MovieList {
  userId: string;
  movieId: string;
  rating: number;
}

export default function MovieRating(props: propsType) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count = ', count);
    console.log('rating = ', props.rating);
    const fetchRating = async () => {
      if (count < 1) {
        setCount(count + 1);
      } else {
        if (props.rating > 0) {
          const movieId = props.movieId;
          const rating = props.rating;
          if (!userId) {
            return;
          }
          const data: MovieList = { userId, movieId, rating };
          console.log('new rating =', data.rating);
          await addRating(data);
        }
      }
    };
    fetchRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.rating]);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={props.rating >= star ? solidStar : regularStar}
          className="cursor-pointer text-3xl text-yellow-500"
          onClick={() => {
            props.setRating(star);
            props.setUpdateWatched(!props.updateWatched);
          }}
        />
      ))}
    </div>
  );
}
