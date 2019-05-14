/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import Image from 'react-native-fast-image';
import Text from './Text';

const image = require('../assets/gradient.jpg');

type Props = {
    title: String,
    loading: Boolean
}

export default function (props: TouchableOpacityProps | Props) {
    return (
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={() => {
                if (!props.loading) {
                    props.onPress();
                }
            }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={[
                        styles.image, {
                            borderRadius: props.style.borderRadius
                        }]}
                    source={image}
                />

                {
                    props.loading ? (
                        <ActivityIndicator color="white" />

                    ) : (
                            <Text style={styles.text}>{props.title}</Text>
                        )
                }
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '100',
        fontSize: 18
    }
});
