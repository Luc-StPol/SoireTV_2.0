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

export const followUser = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/followuser/${id}`);
  return response.data;
};

export const unfollowUser = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/unfollowuser/${id}`);
  return response.data;
};

export const isFollowed = async (id: string, table: string) => {
  const response = await axios.post(`${API_URL}/users/isfollowed`, {
    id: id,
    table: table,
  });
  return response.data;
};

export const addFriend = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/friends/sendfriendrequest/${id}`,
  );
  return response.data;
};

export const cancelFriendRequest = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/friends/cancelfriendrequest/${id}`,
  );
  return response.data;
};

export const isFriend = async (id: string) => {
  const response = await axios.get(`${API_URL}/friends/isfriend/${id}`);
  return response.data;
};

export const getPendingFriendList = async () => {
  const response = await axios.get(`${API_URL}/users/pendingfriendlist`);
  return response.data;
};

export const acceptFriendRequest = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/friends/acceptfriendrequest/${id}`,
  );
  return response.data;
};
