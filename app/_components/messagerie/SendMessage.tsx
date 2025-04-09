import { useState } from 'react';

import { sendMEssage } from '@/lib/api/messagerie';

interface MessageData {
  receiverId: number;
  message?: string;
  friendshipId: number;
}

export default function SendMessage(props: {
  friendId: number;
  friendshipId: number;
}) {
  const [message, setMessage] = useState<string>(String);

  const sendMessageToFriend = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const messageData: MessageData = {
      receiverId: props.friendId,
      message: message,
      friendshipId: props.friendshipId,
    };
    const response = await sendMEssage(messageData);
    if (response) {
      console.log('Message sent', response);
    }
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={sendMessageToFriend}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Envoyé</button>
      </form>
    </div>
  );
}
