/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    View, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';

type Props = {
    navigation: any
}
export default function (props: Props) {
    return (
        <View
            style={[styles.container]}
        >
            <TouchableWithoutFeedback
                onPress={() => props.navigation.goBack()}
            >
                <AnimatableView
                    style={styles.touchableArea}
                    animation={{
                        from: {
                            opacity: 0,
                        },
                        to: {
                            opacity: 0.1,
                        },
                    }}
                    useNativeDriver
                    delay={300}
                />
            </TouchableWithoutFeedback>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
    touchableArea: {
        flex: 1,
        backgroundColor: 'black',
    }
});
