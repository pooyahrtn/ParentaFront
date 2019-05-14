import React from 'react';
import { View, AsyncStorage } from 'react-native';


export default class AuthLoading extends React.Component {

    componentDidMount() {
        const {
            navigation: {
                navigate,
            }
        } = this.props;
        AsyncStorage.getItem('Token (its not banke melis token)').then(res => {
            if (!res) {
                navigate('EntryPage');
            } else {
                navigate('appStack');
            }
        }).catch(err => {
            console.warn(err);
            navigate('EntryPage');
        });
    }

    render() {
        return (
            <View />
        );
    }
}