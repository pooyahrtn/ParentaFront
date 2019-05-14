import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
    style: ViewStyle,
}
export default function Devider(props: Props) {
    const { style } = props;
    return (
        <View
            style={[styles.container, style]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: 0.5,
        backgroundColor: 'rgb(200,200,200)',
    }
});
