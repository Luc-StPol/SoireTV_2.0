import { useEffect, useState } from 'react';

import { followUser, isFollowed, unfollowUser } from '@/lib/api/friends';

export default function FollowUser(props: { id: string }) {
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    const fetchFollowed = async () => {
      try {
        const response = await isFollowed(props.id, 'follow');
        if (response.length > 0) {
          setFollowed(true);
        }
      } catch (err) {
        console.log('Error following user:', err);
      }
    };
    fetchFollowed();
  }, [props.id]);

  const handleFollow = async () => {
    try {
      if (followed === false) {
        await followUser(props.id);
        setFollowed(true);
      } else {
        await unfollowUser(props.id);
        setFollowed(false);
      }
    } catch (err) {
      console.log('Error following user:', err);
    }
  };

  return (
    <button onClick={handleFollow}>
      {' '}
      {followed ? 'Ne plus suivre' : 'suivre'}{' '}
    </button>
  );
}
