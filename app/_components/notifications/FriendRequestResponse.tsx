import { acceptFriendRequest } from '@/lib/api/friends';
import { deleteNotification } from '@/lib/api/notifications';

export default function FriendRequestResponse(props: {
  id: string;
  notificationId: string;
  updateNotifications: (notifId: string) => void;
}) {
  const acceptInvitation = async () => {
    const response = await acceptFriendRequest(props.id);
    if (response) {
      deleteNotification(undefined, undefined, props.notificationId);
      props.updateNotifications(props.notificationId);
    }
  };
  const declineInvitation = async () => {
    deleteNotification(undefined, undefined, props.notificationId);
    props.updateNotifications(props.notificationId);
  };

  return (
    <div className="m-2 flex justify-evenly">
      <button
        className="rounded-xl border-2 border-black bg-transparent p-1 hover:cursor-pointer"
        onClick={acceptInvitation}
      >
        Accepter
      </button>
      <button
        className="rounded-xl border-2 border-black bg-transparent p-1 hover:cursor-pointer"
        onClick={declineInvitation}
      >
        Ignorer
      </button>
    </div>
  );
}
