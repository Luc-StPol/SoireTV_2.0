'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getUser } from '@/lib/api/users';

import EditProfil from './EditProfil';
import UserBestMovies from './UserBestMovies';

export default function UserProfil() {
  const [userProfil, setUserProfil] = useState<UserType>();
  const userId = Cookies.get('userId');
  useEffect(() => {
    const fetchUserProfil = async () => {
      if (!userId) {
        return null;
      }
      const response = await getUser(userId);
      setUserProfil(response.results[0]);
    };
    fetchUserProfil();
  });

  if (!userProfil || !userId) {
    return (
      <div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="m-16">
      <div className="flex md:mt-48">
        <div>
          <EditProfil />
          <Image
            src={`/images/userspp/${userProfil.profilPicture}`}
            alt="photo de profil"
            width={270}
            height={270}
            className="overflow-hidden rounded-full"
          />
        </div>
        <h3 className="p-11">{userProfil.name} </h3>
      </div>
      <div>
        <UserBestMovies userId={userId} />
      </div>
    </div>
  );
}
