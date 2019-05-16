import React from 'react';
import { StyleSheet, SafeAreaView, View, Platform } from 'react-native';
import { Text } from '../components';
import ParsedText from 'react-native-parsed-text';
import { News } from '../containers/News/news.types';
import moment from 'moment-jalaali';
moment.loadPersian({
    usePersianDigits: true,
    dialect: 'persian-modern',
});

export default class NewsDetailScreen extends React.Component {
    item: News;
    constructor(props) {
        super(props);
        const item = this.props.navigation.getParam('item');
        this.item = item;
    }
    render() {

        const {
            sender,
            title,
            timestamp,
            description,
        } = this.item;
        const date = moment(timestamp);

        return (
            <SafeAreaView style={styles.screen}>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                    <Text style={styles.senderText}>{sender}</Text>
                    <Text style={styles.timeText}>{date.format('jD jMMMM')}</Text>
                </View>
                <Text style={styles.titleText}>{title}</Text>
                <ParsedText>
                    
                </ParsedText>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    senderText: {
        fontSize: 14,
        margin: 15,

    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 15,
    },
    bodyText: {
        direction: Platform.OS === 'android' ? 'rtl' : 'inherit',
        textAlign: Platform.OS === 'ios' ? 'right' : 'auto',
        color: 'black',
        margin: 15,
        lineHeight: 25,
    },
    timeText: { color: 'gray', fontSize: 12, margin: 15 },
});