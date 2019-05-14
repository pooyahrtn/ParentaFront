import React from 'react';
import {
    TextInput, TextInputProps, StyleSheet, Platform
} from 'react-native';

// function convertNumbers(text) {
//     const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
//     return String(text).replace(/[0-9]/g, w => id[+w]);
// }

// type Props = {
//     style: TextStyle,
//     transformNumbers: boolean,
// }
export default function CTextInput(props: TextInputProps) {
    const { style } = props;

    return (
        <TextInput {...props} style={[styles.text, style]} />
    );
}

const styles = StyleSheet.create({
    text: {
        // direction: config.rtl ? 'rtl' : 'ltr',
        direction: Platform.OS === 'android' ? 'rtl' : 'inherit',
        textAlign: Platform.OS === 'ios' ? 'right' : 'auto',
        color: 'black',
        fontFamily: 'Behdad'
    }
});
