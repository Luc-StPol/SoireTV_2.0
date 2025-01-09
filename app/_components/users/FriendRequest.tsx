import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { addFriend, cancelFriendRequest, isFriend } from '@/lib/api/friends';
import { deleteNotification, sendNotification } from '@/lib/api/notifications';

export default function FriendRequest(props: { id: string }) {
  const [requested, setRequested] = useState<boolean | string>(false);
  const { data: session } = useSession();
  console.log('session=', session);

  useEffect(() => {
    const fetchFollowed = async () => {
      try {
        const response = await isFriend(props.id);
        console.log('response=', response[0]);
        if (response.length > 0) {
          setRequested(response[0].status);
        }
      } catch (err) {
        console.log('Error following user:', err);
      }
    };
    fetchFollowed();
  }, [props.id]);

  const handleRequest = async () => {
    try {
      if (requested === false) {
        const response = await addFriend(props.id);
        if (response) {
          await sendNotification(
            props.id,
            `Vous avez reçu une demande d'ami de ${session?.user.name}`,
            'friendRequest',
          );
        }
        setRequested('pending');
      }
      if (requested === 'pending') {
        const response = await cancelFriendRequest(props.id);

        if (response) {
          await deleteNotification(props.id, 'friendRequest');
        }
        setRequested(false);
      }
    } catch (err) {
      console.log('Error following user:', err);
    }
  };

  console.log('requested=', requested);

  return (
    <button onClick={handleRequest}>
      {requested === false && 'Demander en amis'}
      {requested === 'pending' && 'Annuler la demande'}
    </button>
  );
}
