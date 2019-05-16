import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View, Platform,
    Linking, FlatList,
    Dimensions, TouchableOpacity,
    Image, ScrollView
} from 'react-native';
import { Text } from '../components';
import ParsedText from 'react-native-parsed-text';
import { News } from '../containers/News/news.types';
import { shadow } from '../theme';
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

    handleUrlPress = (url) => {
        Linking.openURL(url);
    }

    handlePhonePress = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    }

    onAttachmentPressed = (item) => {
        Linking.openURL(item.link);
    }

    render() {

        const {
            sender,
            title,
            timestamp,
            description,
            attachments,
            buttons
        } = this.item;
        const date = moment(timestamp);

        return (
            <View style={styles.screen}>

                <ScrollView style={{ flex: 1 }}>
                    <>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                            <Text style={styles.senderText}>{sender}</Text>
                            <Text style={styles.timeText}>{date.format('jD jMMMM')}</Text>
                        </View>
                        <Text style={styles.titleText}>{title}</Text>
                        <ParsedText
                            style={styles.bodyText}
                            parse={
                                [
                                    { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                                    { type: 'phone', style: styles.phone, onPress: this.handlePhonePress },
                                ]
                            }
                        >
                            {description}
                        </ParsedText>
                        {(attachments) && (
                            <FlatList
                                data={attachments}
                                horizontal
                                keyExtractor={(_, index) => String(index)}
                                renderItem={({ item }) => <Attachment item={item} onPress={this.onAttachmentPressed} />}
                            />
                        )}
                    </>
                </ScrollView>

                {buttons && buttons.length > 0 && (
                    <SafeAreaView style={{ backgroundColor: 'white', ...shadow }}>
                        <View style={styles.actionButtonContainer}>
                            {buttons.map(b => (
                                <TouchableOpacity
                                    style={[styles.actionButton, {
                                        backgroundColor: b.background_color
                                    }]}
                                    key={b.id}
                                >
                                    <Text style={{ textAlign: 'center', color: b.text_color, margin: 10, fontWeight: 'bold' }}>{b.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </SafeAreaView>
                )}
            </View>
        );
    }
}

type AttachmentType = {
    item: {
        title: String,
        link: String,
    },
    onPress: (item: Object) => void
}
function Attachment(props: AttachmentType) {
    const { item: { title, link }, onPress } = props;
    // item: https://esossl-a.akamaihd.net/s-final-defender_wallpaper-1920x1080.jpg
    const isImage = /(.+)\.(jpg|jpeg|png)/.test(link);
    return (
        <TouchableOpacity
            style={styles.attachmentCard}
            onPress={() => onPress({ link })}
        >
            {isImage && (
                <Image
                    style={styles.image}
                    source={{ uri: link }}
                />
            )}
            <View style={styles.overlay}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                }}
                    ellipsizeMode="tail"
                >{title}</Text>
            </View>

        </TouchableOpacity>
    )

}

const screenWidth = Dimensions.get('screen').width;
const margin = 15;

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
    url: {
        color: 'blue',
    },
    phone: {
        color: 'blue'
    },
    attachmentCard: {
        width: (screenWidth - 4 * margin) / 2,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        margin,
        marginRight: 0,
        ...shadow,
    },
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(140,140,140,0.6)',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'flex-end'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        position: 'absolute',
    },
    actionButtonContainer: {
        flexDirection: 'row',
        paddingLeft: margin,
    },
    actionButton: {
        flex: 1,
        margin,
        marginLeft: 0,
        borderRadius: 10,
        justifyContent: 'center',
        ...shadow,
        elevation: 1,
    }
}); 