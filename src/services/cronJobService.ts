import cron from 'node-cron';

import User from '@models/User';

import { sendPushNotification } from './pushNotificationService';

const notifyUsers = async () => {
  try {
    // Find users with valid push tokens
    const users = await User.find({ pushToken: { $exists: true, $ne: null } });

    for (const user of users) {
      const { pushToken } = user;

      if (pushToken) {
        const response = await sendPushNotification(
          pushToken,
          'Scheduled Notification',
          `Hello, this is a scheduled notification.`,
          {
            userId: user._id,
          }
        );

        console.log('Push notification sent:', response);
      }
    }
  } catch (error) {
    console.error('Error sending scheduled notifications:', error);
  }
};

// Schedule the cron job to run at a specified time
cron.schedule('30 * * * *', async () => {
  console.log('Running daily notification job');
  await notifyUsers();
});
