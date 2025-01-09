'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getFriend } from '@/lib/api/friends';

import FollowUser from './FollowUser';
import FriendRequest from './FriendRequest';
import UserBestMovies from './UserBestMovies';

export default function FriendProfil() {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        return null;
      }
      try {
        const response = await getFriend(id);
        setUser(response.results[0]);
      } catch (err) {
        console.log('Error fetching user:', err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <div>
        <FontAwesomeIcon icon="spinner" spin />
      </div>
    );
  }

  return (
    <div className="m-16">
      <div className="flex md:mt-48">
        <div>
          <Image
            src={`/images/userspp/${user.profilPicture}`}
            alt="photo de profil"
            width={270}
            height={270}
            className="overflow-hidden rounded-full"
          />
        </div>
        <div className="flex flex-col px-7 py-11">
          <h3 className="ml-5">{user.name} </h3>
          <Link href={`/users/watched/${id}`}>
            <p className="mt-3">Films vu</p>
          </Link>
          <Link href={`/users/watchlist/${id}`}>
            <p className="mt-3">Watchlist</p>
          </Link>
          <FollowUser id={id || ''} />
          <FriendRequest id={id || ''} />
        </div>
      </div>
      <div>
        <UserBestMovies userId={user.id} />
      </div>
    </div>
  );
}
