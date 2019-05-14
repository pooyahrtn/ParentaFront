import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../theme';
import MainScreen from '../screens/MainScreen/mainscreen.screen';
import NewsDetailsScreen from '../screens/NewsDetailScreen';
import { Icon } from '../components';

export default createStackNavigator({
    MainScreen,
    NewsDetailsScreen: {
        screen: NewsDetailsScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => (
                <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" color="white"/>
                </TouchableOpacity>
            )
        })
    },
}, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTitle: 'علامه طباطبایی',
            headerTitleStyle: {
                color: 'white',
            },

        },
        headerLayoutPreset: 'center',

    });