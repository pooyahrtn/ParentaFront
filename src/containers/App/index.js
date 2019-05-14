import AppContainer from './app.container';
import AppTypes from './app.types';
import LoginStates from './LoginStates';

const instance = new AppContainer({
    storeName: 'AppContainer',
    persistKeys: ['phoneNumber', 'loginState']
});

export default {
    instance,
    AppTypes,
    AppContainer,
    LoginStates,
};
