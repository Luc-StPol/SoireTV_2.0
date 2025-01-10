import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/notifications/getnotifications`);
  return response.data;
};
export const sendNotification = async (
  id: string,
  message: string,
  type: string,
) => {
  const response = await axios.post(
    `${API_URL}/notifications/sendnotification`,
    {
      id: id,
      message: message,
      type: type,
    },
  );
  return response.data;
};
export const updateNotificationStatus = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/notifications/updatestatus/${id}`,
  );
  return response.data;
};

export const deleteNotification = async (id: string, type: string) => {
  console.log('id=', id);
  console.log('type=', type);
  const response = await axios.post(
    `${API_URL}/notifications/deletenotification`,
    {
      id: id,
      type: type,
    },
  );

  return response.data;
};
