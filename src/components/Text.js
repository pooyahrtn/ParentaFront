import React from 'react';
import {
    Text, TextStyle, StyleSheet, TextProps, Platform
} from 'react-native';

function convertNumbers(text) {
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(text).replace(/[0-9]/g, w => id[+w]);
}

type Props = {
    style: TextStyle,
    transformNumbers: boolean,
}
export default function CText(props: Props | TextProps) {
    const { children, style, transformNumbers } = props;

    return (
        <Text {...props} style={[styles.text, style]}>
            {transformNumbers
                ? convertNumbers(children) : children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        // direction: config.rtl ? 'rtl' : 'ltr',
        direction: Platform.OS === 'android' ? 'rtl' : 'inherit',
        textAlign: Platform.OS === 'ios' ? 'right' : 'auto',
        color: 'black',
        // fontFamily: 'Behdad'
    }
});
