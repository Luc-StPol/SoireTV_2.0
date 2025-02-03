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
import { getNotifications } from '@/lib/api/notifications';

import Notification from './Notification';

type Notification = {
  id: string;
  message: string;
};

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
  const [i, setI] = useState(1);

  const updateNotifications = (notifId: string) => {
    setNotifications((prevNotif) =>
      prevNotif.filter((notification) => notification.id !== notifId),
    );
  };

  useEffect(() => {
    const initSocketIo = async () => {
      const response = await fetch('api/socket');
      if (response) {
        console.log('socket initialisé');
      }
    };
    initSocketIo();

    const socket: typeof Socket = socketIOClient({
      path: '/api/socketio',
      query: {
        userId: userId,
      },
    });
    console.log('SOCKET:', socket);
    //Récupérer les nouvelles notifications

    const fetchNotifications = async () => {
      const response = await getNotifications();
      if (response) {
        setNotifications(response.results);
        setI(i + 1);
      }
    };
    if (i === 1) {
      fetchNotifications();
    }

    // Récupérer les nouvelles notifications en temps réelle
    socket.on('new_notification', (notification: FriendRequest) => {
      setNotifications((prev) => [...prev, notification]);
      console.log('unread notificaiton:', notification);
    });

    socket.on('remove_notification', (notification: FriendRequest) => {
      updateNotifications(notification.id);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
