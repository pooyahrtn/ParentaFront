import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    StatusBar,
    TextInput,
    AsyncStorage
} from 'react-native';
import { Text, LoadingButton } from '../../components';
import backgroundImage from '../../assets/background.jpg';
import { colors, shadow } from '../../theme';
import { timeout } from '../../utils/timeout';

const Steps = {
    phoneNumber: 'ph',
    confirmCode: 'cc',
}

export default class LoginPage extends Component {
    state = {
        phoneNumber: '',
        step: Steps.phoneNumber,
        confirmCode: '',
        isConfirmCodeInValid: false,
        loading: false,
    }

    setPhoneNumber = (value) => {
        this.setState({
            phoneNumber: value
        })
    }

    setConfirmCode = (value) => {
        this.setState({
            confirmCode: value,
        });
    }

    isPhoneNumberValid = (phoneNumber) => {
        return /09\d{9}/.test(phoneNumber);
    }

    showPhoneNumberError = (phoneNumber: String) => {
        if (phoneNumber.length === 11) {
            return !this.isPhoneNumberValid(phoneNumber);
        }
        return false;
    }

    onPhoneNumberConfirmPressed = (phoneNumber) => {
        if (this.isPhoneNumberValid(phoneNumber)) {
            this.setState({
                step: Steps.confirmCode,
            })
        }
    }

    onLoginButtonPressed = async () => {
        const {
            phoneNumber,
            confirmCode,
        } = this.state;
        this.setState({
            loading: true,
        })
        const res = await timeout(1000);
        /**
         * res: {
         *  1: confirm code is valid or not
         *  2: if confirm code is valid: token
         *  3: error
         * }
         */
        const token = '1234';
        await AsyncStorage.setItem('Token (its not banke melis token)', token);
        this.setState({
            loading: false,
            // isConfirmCodeInValid: true
        });
        this.props.navigation.navigate('appStack');
    }

    render() {
        const {
            phoneNumber,
            step,
            confirmCode,
            isConfirmCodeInValid,
            loading
        } = this.state;

        return (
            <View
                style={styles.screen}
            >
                <StatusBar
                    backgroundColor='green'
                />
                <Image
                    source={backgroundImage}
                    style={styles.backgroundImage}
                />
                <SafeAreaView
                    style={styles.container}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 5,
                            paddingVertical: 10,
                        }}
                    >

                        {
                            this.showPhoneNumberError(phoneNumber) && (
                                <Text style={styles.errorText}>شماره تماس معتبر نیست</Text>
                            )
                        }
                        <Text style={styles.fieldTitle}>شماره تماس</Text>

                        <TextInput
                            placeholder="۰۹*********"
                            style={styles.textInput}
                            value={phoneNumber}
                            autoFocus
                            onChangeText={this.setPhoneNumber}
                            keyboardType="number-pad"
                            maxLength={11}
                        />
                        {
                            step === Steps.phoneNumber && (

                                <LoadingButton
                                    style={[
                                        styles.confirmButtonInactive,
                                        this.isPhoneNumberValid(phoneNumber) && styles.confirmButtonActive
                                    ]}
                                    loading={loading}
                                    onPress={() => this.onPhoneNumberConfirmPressed(phoneNumber)}
                                >
                                    <Text style={styles.confirmButtonText}>ادامه</Text>
                                </LoadingButton>
                            )
                        }
                        {
                            step === Steps.confirmCode && (
                                <>
                                    {
                                        isConfirmCodeInValid && (
                                            <Text style={styles.errorText}>کد تایید معتبر نیست</Text>
                                        )
                                    }
                                    <Text style={styles.fieldTitle}>کد تایید</Text>

                                    <TextInput
                                        placeholder="1234"
                                        style={styles.textInput}
                                        value={confirmCode}
                                        onChangeText={this.setConfirmCode}
                                        keyboardType="number-pad"
                                        autoFocus
                                        maxLength={4}
                                    />
                                    <LoadingButton
                                        style={[
                                            styles.confirmButtonInactive,
                                            styles.confirmButtonActive
                                        ]}
                                        loading={loading}
                                        onPress={this.onLoginButtonPressed}
                                    >
                                        <Text style={styles.confirmButtonText}>ورود</Text>
                                    </LoadingButton>
                                </>
                            )
                        }

                    </View>

                </SafeAreaView>
            </View>
        );
    }
}

const TEXT_INPUT_HEIGHT = 46;


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    textInputContainer: {

    },
    textInput: {
        margin: 5,
        height: TEXT_INPUT_HEIGHT,
        borderRadius: TEXT_INPUT_HEIGHT / 2,
        borderColor: 'rgb(200,200,200)',
        borderWidth: 1,
        paddingHorizontal: TEXT_INPUT_HEIGHT / 2,
    },
    fieldTitle: {
        margin: 10,
        marginVertical: 3,
        fontSize: 15
    },
    confirmButtonInactive: {
        height: TEXT_INPUT_HEIGHT,
        borderRadius: TEXT_INPUT_HEIGHT / 2,
        margin: 5,
        marginTop: 10,
        backgroundColor: 'gray',
        justifyContent: 'center',
        ...shadow
    },
    confirmButtonActive: {
        backgroundColor: '#4286f4',
    },
    confirmButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    },
    errorText: {
        margin: 10,
        marginVertical: 3,
        fontSize: 15,
        color: 'red',
    }
});