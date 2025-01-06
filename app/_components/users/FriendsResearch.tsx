import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useResearchData } from '@/app/context/ResearchData';
import { searchUsers } from '@/lib/api/friends';

export default function FriendsResearch() {
  const { researchName } = useResearchData();
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!researchName) {
          return;
        }
        const response = await searchUsers(researchName);
        setUsersList(response.users);
        console.log(response);
      } catch (err) {
        console.log('Error fetching movies:', err);
      }
    };
    fetchMovies();
  }, [researchName]);

  return (
    <div>
      {usersList &&
        usersList.map((user) => (
          <div key={user.id}>
            <Link href={`/user/${user.id}`}>
              <div className="flex items-center">
                <Image
                  src={`/images/userspp/${user.profilPicture}`}
                  alt={user.name}
                  height={140}
                  width={140}
                  className="m-4 overflow-hidden rounded-full"
                />
                <p className="m-4 text-xl">{user.name}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
