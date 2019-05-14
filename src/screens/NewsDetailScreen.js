import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Text } from '../components';


export default class NewsDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        const item = this.props.navigation.getParam('item');
        this.item = item;
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <Text>{}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});