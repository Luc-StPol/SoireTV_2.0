import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { updateNotificationStatus } from '@/lib/api/notifications';

import FriendRequestResponse from './FriendRequestResponse';

interface Notification {
  id: string;
  status: string;
  type: string;
  message: string;
  sendById: string;
}

export default function Notification(props: {
  notification: Notification;
  updateNotifications: (notifId: string) => void;
}) {
  const notification = props.notification;
  const [notificationStatus, setNotificationStatus] = useState(
    notification.status,
  );

  const handleMouseEnter = async () => {
    if (notificationStatus === 'unread') {
      const response = await updateNotificationStatus(notification.id);
      if (response) {
        setNotificationStatus('readed');
      }
    } else {
      return;
    }
  };
  return (
    <DropdownMenuItem
      key={notification.id}
      className={`border-b-2 border-b-black pt-2 ${notificationStatus === 'unread' ? 'bg-gray-200' : 'bg-gray-100'} `}
    >
      <div
        onMouseEnter={
          notification.status === 'unread' ? handleMouseEnter : undefined
        }
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
          <p>{notification.message}</p>
        </div>

        <div>
          {notification.type === 'friendRequest' ? (
            <FriendRequestResponse
              id={notification.sendById}
              notificationId={notification.id}
              updateNotifications={props.updateNotifications}
            />
          ) : null}
        </div>
      </div>
    </DropdownMenuItem>
  );
}
