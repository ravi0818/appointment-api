import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

const expo = new Expo();

export const sendPushNotification = async (
  pushToken: string,
  title: string,
  body: string,
  data?: object
): Promise<ExpoPushTicket[]> => {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return [];
  }

  const messages: ExpoPushMessage[] = [
    {
      to: pushToken,
      sound: 'default',
      title,
      body,
      data,
    },
  ];

  try {
    console.log('Sending push notification:', messages);
    const tickets = await expo.sendPushNotificationsAsync(messages);
    return tickets;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return [];
  }
};
