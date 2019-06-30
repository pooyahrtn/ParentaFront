import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    AsyncStorage
} from 'react-native';
import { Text } from '../../components';
import backgroundImage from '../../assets/background.jpg';
import logo from '../../assets/logo.png';
import { colors } from '../../theme';

export default class EntryPage extends Component {

    onEnterButtonPressed = () => {
        this.props.navigation.navigate('LoginPage');
    }

    render() {
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
                    style={styles.screen}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={logo}
                            style={styles.logoImage}
                        />
                        <Text style={{ color: 'white', fontSize: 24 }}>علامه طباطبایی</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.onEnterButtonPressed}
                        style={styles.loginButtonContainer}
                    >
                        <Text style={styles.loginText}>ورود</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    }
}

const LOGO_SIZE = 200;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    loginButtonContainer: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        padding: 20,
    },
    logoImage: {
        width: LOGO_SIZE,
        height: LOGO_SIZE,

    }
});