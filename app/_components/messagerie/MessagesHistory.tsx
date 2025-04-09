import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

import { getMessages } from '@/lib/api/messagerie';

import SendMessage from './SendMessage';

interface Message {
  id: number;
  message: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  friendshipId: number;
}

interface FriendData {
  id: number;
  name: string;
  profilPicture: string;
  friendshipId: number;
}

export default function MessagesHistory(props: { friendData: FriendData }) {
  const [historic, setHistoric] = useState<Message[]>([]);
  const { data: session } = useSession();
  const [i, setI] = useState(1);
  const roomId = 'friendRoom' + props.friendData.friendshipId;

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
        roomId: roomId,
      },
    });

    const fetchMessages = async () => {
      const response = await getMessages(props.friendData.id);
      if (response) {
        setHistoric(response.results);
      }
    };
    if (props.friendData.id != 0 && i === 1) {
      fetchMessages();
      setI(i + 1);
    }
    fetchMessages();

    // Récupérer les nouvelles notifications en temps réelle
    socket.on('new_message', (message: Message) => {
      setHistoric((prev) => [...prev, message]);
      console.log('unread notificaiton:', historic);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.friendData]);

  return (
    <div className="h-[calc(100vh-250px)] w-full border p-4">
      {historic && session ? (
        <>
          <div>
            {historic.map((message: Message) => (
              <div key={message.id}>
                {message.receiverId != props.friendData.id ? (
                  //friend message
                  <div className="flex items-center">
                    <CldImage
                      src={props.friendData.profilPicture}
                      alt="photo de profil"
                      width={50}
                      height={50}
                      className="mr-4 overflow-hidden rounded-full"
                    />
                    <p>{message.message}</p>
                  </div>
                ) : (
                  //user message
                  <div className="flex items-center justify-end">
                    <p>{message.message}</p>
                    <CldImage
                      src={session.user.image || '/default-profile.png'}
                      alt="photo de profil"
                      width={50}
                      height={50}
                      className="mr-4 overflow-hidden rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <SendMessage
            friendId={props.friendData.id}
            friendshipId={props.friendData.friendshipId}
          />
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
