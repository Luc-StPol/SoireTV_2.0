'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getUser } from '@/lib/api/users';

import EditProfil from './EditProfil';
import UserBestMovies from './UserBestMovies';

export default function UserProfil() {
  const [userProfil, setUserProfil] = useState<UserType>();
  // Use useSession to get session data
  const session = useSession();
  const userId = session.data?.user?.id;
  console.log('session:', session);

  useEffect(() => {
    const fetchUserProfil = async () => {
      // Check if session is loaded
      if (!session) {
        return null;
      }

      // Check if user ID is available
      if (!userId) {
        return null;
      }

      // Fetch user information
      const response = await getUser(userId);
      setUserProfil(response.results[0]);
    };
    fetchUserProfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show loading message if user data is not yet available
  if (!userProfil || !userId) {
    return (
      <div>
        <p>Loading...</p>
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
            alt="profile picture"
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
