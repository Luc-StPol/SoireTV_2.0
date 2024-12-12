import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/user/${id}`);
  return response.data;
};
