import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

export default class NotificationHandler {
    startNotification = () => {
        const channel = new firebase.notifications.Android.Channel(
            'channelId',
            'Channel Name',
            firebase.notifications.Android.Importance.Max
        ).setDescription('A natural description of the channel');
        firebase.notifications().android.createChannel(channel);

        // the listener returns a function you can use to unsubscribe
        this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
            if (Platform.OS === 'android') {

                const localNotification = new firebase.notifications.Notification({
                    sound: 'default',
                    show_in_foreground: true,
                })
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .android.setChannelId('channelId') // e.g. the id you chose above
                    .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
                    .android.setColor('#000000') // you can set a color here
                    .android.setPriority(firebase.notifications.Android.Priority.High);

                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));

            } else if (Platform.OS === 'ios') {

                const localNotification = new firebase.notifications.Notification()
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .ios.setBadge(notification.ios.badge);

                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));

            }
        });
    }
    close = () => {
        this.unsubscribeFromNotificationListener();
    }
}
