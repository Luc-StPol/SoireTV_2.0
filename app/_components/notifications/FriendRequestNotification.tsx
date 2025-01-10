import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import FriendRequestResponse from './FriendRequestResponse';

type FriendRequest = {
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
  const [notificationStatus, setNotificationStatus] = useState(String);

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

  const handleMouseEnter = () => {
    console.log('Mouse enter');
    setNotificationStatus('pending');
  };

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
            <DropdownMenuItem
              key={notification.id}
              className={`border-b-2 border-b-black ${notificationStatus === 'unread' ? 'bg-gray-200' : 'bg-gray-100'} `}
            >
              <div
                onMouseEnter={
                  notification.status === 'unread'
                    ? handleMouseEnter
                    : undefined
                }
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                  <p>{notification.message}</p>
                </div>

                <div>
                  {notification.type === 'friendRequest' ? (
                    <FriendRequestResponse />
                  ) : null}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
