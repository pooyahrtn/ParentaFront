import React from 'react';
import Image from 'react-native-fast-image';
import {
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    View,
    ActivityIndicator,
    Platform
} from 'react-native';
import Icon from './Icon';

type Props = {
    image: string,
    containerStyle: ViewStyle,
    onPress: () => void,
    loading: boolean,
    baseUrl: string
}
export default function (props: Props) {
    const {
        containerStyle,
        image,
        onPress,
        loading,
        baseUrl
    } = props;
    if (image) {
        return (
            <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
                <Image
                    source={{ uri: image }}
                    style={{
                        width: containerStyle.width - 2,
                        height: containerStyle.height - 2,
                        borderRadius: containerStyle.borderRadius - 1,
                    }}
                />
            </TouchableOpacity>
        );
    }
    if (loading) {
        return (
            <View style={[styles.container, containerStyle]}>
                <ActivityIndicator
                    color="gray"
                    size={Platform.OS === 'android' ? 50 : 1}
                />
            </View>
        );
    }
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <Icon name="user" size={40} color="gray" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 0
        }
    }
});
