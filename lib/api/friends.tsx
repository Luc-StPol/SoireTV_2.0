import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const searchUsers = async (userName: string) => {
  const response = await axios.get(
    `${API_URL}/friends/searchusers/${userName}`,
  );
  return response.data;
};

export const getFriend = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/friend/${id}`);
  return response.data;
};
