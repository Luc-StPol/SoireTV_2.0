import { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

type FriendRequest = {
  id: string;
  userId: string;
  status: string;
  message: string;
};

export default function FriendRequestNotification({
  userId,
}: {
  userId: string;
}) {
  const [notifications, setNotifications] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const socket: typeof Socket = socketIOClient({ path: '/api/socketio' });

    // Joindre la room
    socket.emit('join', userId);

    // Récupérer les notifications non lues
    socket.on(
      'unread_notifications',
      (unreadNotifications: FriendRequest[]) => {
        setNotifications((prev) => [...prev, ...unreadNotifications]);
      },
    );

    // Écouter les nouvelles notifications
    socket.on('friend_request_notification', (data: FriendRequest) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    console.log('notifications:', notifications);
  }, [notifications]);

  return (
    <div>
      <h2>Vos Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
