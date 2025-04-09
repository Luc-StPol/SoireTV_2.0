import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MessageData {
  receiverId: number;
  message?: string;
  friendshipId?: number;
}

export const sendMEssage = async (messageData: MessageData) => {
  const response = await axios.post(`${API_URL}/messagerie/sendmessage`, {
    receiverId: messageData.receiverId,
    message: messageData.message,
    friendshipId: messageData.friendshipId,
  });
  return response.data;
};

export const getMessages = async (id: number) => {
  const response = await axios.get(`${API_URL}/messagerie/getmessages/${id}`);
  return response.data;
};
