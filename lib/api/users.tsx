import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserData {
  userId: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  name?: string;
}

export const getUser = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/user/${id}`);
  return response.data;
};

export const editUserInformations = async (data: UserData) => {
  const response = await axios.post(`${API_URL}/users/editinformations`, {
    userId: data.userId,
    email: data.email,
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
    name: data.name,
  });
  return response.data;
};

export const editUserPp = async (formData: FormData) => {
  console.log(formData);
  const response = await axios.post(`${API_URL}/users/addpp`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
