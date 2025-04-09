'use client';

import { useState } from 'react';

import FriendList from './FriendList';
import MessagesHistory from './MessagesHistory';

interface FriendData {
  id: number;
  name: string;
  profilPicture: string;
  friendshipId: number;
}

export default function MessagerieInterface() {
  const [friendData, setFriendData] = useState<FriendData>({
    id: 0,
    name: '',
    profilPicture: '',
    friendshipId: 0,
  });

  const updateFriendId = (friendData: FriendData) => {
    setFriendData(friendData);
  };

  return (
    <div>
      <FriendList updateFriendId={updateFriendId} />
      <MessagesHistory friendData={friendData} />
    </div>
  );
}
