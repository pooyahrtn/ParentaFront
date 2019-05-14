import { createSwitchNavigator } from 'react-navigation';
import EntryPage from '../screens/EntryPage/entrypage.screen';
import LoginPage from '../screens/LoginPage/loginpage.screen';
import appStack from './stackNavigator';
import AuthLoadginScreen from '../screens/AuthLoadingScreen';

export default createSwitchNavigator({
    AuthLoadginScreen,
    EntryPage: EntryPage,
    LoginPage: LoginPage,
    appStack,
});
