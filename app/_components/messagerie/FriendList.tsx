'use client';

import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { getFriendsList } from '@/lib/api/friends';

interface Friend {
  profilPicture: string;
  id: number;
  name: string;
  friendshipId: number;
}

export default function FriendList(props: {
  updateFriendId: (friendData: Friend) => void;
}) {
  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriendsList = async () => {
      const response = await getFriendsList();
      if (response) {
        setFriendsList(response.results);
        console.log('Friendslist =', response.results[0]);
        props.updateFriendId(response.results[0]);
      }
    };
    fetchFriendsList();
  }, []);

  return (
    <div className="m-3 h-[calc(100vh-250px)] w-64 overflow-auto border p-4">
      {friendsList ? (
        <div>
          {friendsList.map((user) => (
            <ul key={user.id} className="flex items-center ">
              <CldImage
                src={user.profilPicture}
                alt="photo de profil"
                width={50}
                height={50}
                className="mr-4 overflow-hidden rounded-full"
                onClick={() => props.updateFriendId(user)}
              />
              <li>{user.name}</li>
            </ul>
          ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
