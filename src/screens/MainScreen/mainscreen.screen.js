import React, { Component } from 'react';
import {
    SafeAreaView,
    StatusBar,
    View, FlatList, StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Text } from '../../components';
import { shadow, colors } from '../../theme';
import moment from 'moment-jalaali';
import NewsContainer from '../../containers/News/news.container';
import { wrapContainer } from '../../containers';
moment.loadPersian({
    usePersianDigits: true,
    dialect: 'persian-modern',
})
const Height = 100;



type Props = {
    newsContainer: NewsContainer
}
class MainScreen extends Component<Props> {

    onNewsItemPressed = (item) => {
        this.props.navigation.navigate('NewsDetailsScreen', { item });
    }

    render() {
        const { newsContainer: { state: { news } } } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={colors.statusbarColor}
                    barStyle="light-content"
                />
                <FlatList
                    data={news}
                    renderItem={({ item }) => {
                        return (
                            <Card
                                item={item}
                                onPress={() => this.onNewsItemPressed(item)}
                            />
                        );
                    }}
                />

            </SafeAreaView>
        );
    }
}

export default wrapContainer(MainScreen, {}, {
    name: 'newsContainer',
    container: NewsContainer,
})

type CardProps = {
    item: News,
    onPress: () => void,
}
function Card(props: CardProps) {
    const { item, onPress } = props;
    const { sender, description, title, timestamp } = item;
    const date = moment(timestamp);
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >
            <View style={[styles.spaceStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text style={styles.timeText}>{date.format('jD jMMMM')}</Text>
                <Text style={{ fontSize: 12 }}>{sender}</Text>
            </View>

            <View style={styles.spaceStyle}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.spaceStyle}>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.bodyTextStyle}
                >
                    {description}
                </Text>
            </View>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    spaceStyle: {
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    card: {
        marginHorizontal: 10,
        marginBottom: 3,
        marginTop: 7,
        shadowOpacity: 0.3,
        paddingVertical: 6,
        shadowOffset: {
            width: 0,
            height: 0
        },
        backgroundColor: 'white',
        borderRadius: 10,
        ...shadow,
        elevation: 3,
    },
    bodyTextStyle: {
        color: 'gray',
    },
    titleText: {
        fontWeight: 'bold',

    },
    timeText: { color: 'gray', fontSize: 12 },
});

