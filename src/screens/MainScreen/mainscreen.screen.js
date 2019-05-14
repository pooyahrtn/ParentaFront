import React, { Component } from 'react';
import {
    SafeAreaView,
    StatusBar,
    View, FlatList, StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Text } from '../../components';
import { shadow, colors } from '../../theme';
const Height = 100;


type News = {
    title: String,
    description: String,
    sender: String,
    key: String,
    timestamp: Date,
}
const news: News[] = [
    {
        title: 'کلاس پژوهش',
        description: 'کلاس پنجشنبه برگزار نمیگردد',
        sender: 'واحد پژوهش',
        key: '1',
        timestamp: new Date(),
    },
    {
        title: 'سهمیه بندی بنزین',
        description: 'سمت نمایندگی قائم به شخص است و قابل واگذاری به دیگری نیست. مجلس نمی‌تواند اختیار قانونگذاری را به شخص یا هیأتی واگذار کند ولی در موارد ضروری می‌تواند اختیار وضع بعضی از قوانین را با رعایت اصل هفتاد و دوم به کمیسیون‌های داخلی خود تفویض کند، در این صورت این قوانین در مدتی که مجلس تعیین می‌نماید به صورت آزمایشی اجرا می‌شود و تصویب نهایی آنها با مجلس خواهد بود. همینین مجلس شورای اسلامی می‌تواند تصویب دائمی اساسنامه سازمانها، شرکتها، موُسسات دولتی یا وابسته به دولت را با رعایت اصل هفتاد و دوم به کمیسیونهای ذیربط واگذار کند و یا اجازه تصویب آنها را به دولت بدهد. در این صورت مصوبات دولت نباید با اصول و احکام مذهب رسمی کشور و یا قانون اساسی مغایرت داشته باشد، تشخیص این امر به ترتیب مذکور در اصل نود و ششم با شورای نگهبان است. علاوه بر این، مصوبات دولت نباید مخالفت قوانین و مقررات عمومی کشور باشد و به منظور بررسی و اعلام عدم مغایرت آنها با قوانین مزبور باید ضمن ابلاغ برای اجرا به اطلاع رئیس مجلس شورای اسلامی برسد. ',
        sender: 'واحد بنزین',
        key: '2',
        timestamp: new Date(),
    },
    {
        title: 'جدایی جانی دپ و امبر هرت',
        description: 'در کمال تعجب این زوج رویایی جدا شددن',
        sender: 'فرهنگی',
        key: '3',
        timestamp: new Date(),
    },
];


export default class MainScreen extends Component {

    onNewsItemPressed = (item) => {
        this.props.navigation.navigate('NewsDetailsScreen');
    }

    render() {
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


type CardProps = {
    item: News,
    onPress: () => void,
}
function Card(props: CardProps) {
    const { item, onPress } = props;
    const { sender, description, title } = item;
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >
            <View style={[styles.spaceStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text style={{ color: 'gray', fontSize: 12 }}>۱۳ فروردین</Text>
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

    }
});

