
import Container from '../../utils/StoreContainer';

import LoginStates from './LoginStates';
import { timeout } from '../../utils/timeout';


export default class AppContainer extends Container {
    state = {
        loginState: LoginStates.SignedOut,
        phoneNumber: '',
        loadingConfirmCode: false,
    }

    setPhoneNumber = phoneNumber => this.setState({
        phoneNumber,
        loginState: LoginStates.WaitForConfirm,
    }, true)

    sendConfirmCode = async (code) => {
        await this.setState({
            loadingConfirmCode: true,
        });
        await timeout(3000);
        await this.setState({
            loadingConfirmCode: false,
            loginState: LoginStates.WaitForProfile,
        }, true);
    }

    setFirstProfileCompleted = () => this.setState({
        loginState: LoginStates.LoggedIn,
    }, true);
}
