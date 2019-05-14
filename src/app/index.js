import React from 'react';
// import firebase from 'react-native-firebase';
import { Provider } from 'unstated';
import containers from '../containers';

// import NotificationHandler from './notification';
// import { onNavigationStateChange } from './analytics';
import Router from '../router';
import NavigationService from '../utils/NavigationService';
import AxiosProvider from '../utils/axios';

export default class Entry extends React.Component {
    componentDidMount() {
        // firebase.analytics().setAnalyticsCollectionEnabled(true);
        // this.notificationHandler = new NotificationHandler();
        // this.notificationHandler.startNotification();
    }

    componentWillUnmount() {
        // this.notificationHandler.close();
    }

    render() {
        return (
            // <Provider inject={containers}>
                <Router
                    // onNavigationStateChange={onNavigationStateChange}
                    ref={(ref) => {
                        NavigationService.setContainer(ref);
                    }}
                />
            // </Provider>

        );
    }
}

export { default as config } from './config';

export const baseUrl = 'https://getonyva.com';


export const api = new AxiosProvider({
    baseUrl,
    onNotAuthorized: () => {
        // clearStore().then(() => {
        NavigationService.navigate('AuthLoadingScreen');
        // });
    }
});
