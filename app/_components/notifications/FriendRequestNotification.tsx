import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Notification from './Notification';

type FriendRequest = {
  sendById: string;
  type: string;
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

  const updateNotifications = (notifId: string) => {
    setNotifications((prevNotif) =>
      prevNotif.filter((notification) => notification.id !== notifId),
    );
  };

  useEffect(() => {
    const socket: typeof Socket = socketIOClient({ path: '/api/socketio' });

    // Joindre la room
    socket.emit('join', userId);

    // Récupérer les notifications non lues
    socket.on('notifications', (unreadNotifications: FriendRequest[]) => {
      setNotifications((prev) => [...prev, ...unreadNotifications]);
    });

    // Écouter les nouvelles notifications
    socket.on('friend_request_notification', (data: FriendRequest) => {
      setNotifications((prev) => [...prev, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div className="mr-16">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="border-0 bg-inherit selection:border-0">
          <div>
            <FontAwesomeIcon icon={faBell} className="h-8" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" h-96 overflow-y-auto bg-gray-100 p-0 ">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((notification) => (
            <div key={notification.id}>
              <Notification
                notification={notification}
                updateNotifications={updateNotifications}
              />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
