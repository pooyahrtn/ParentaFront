import React from 'react';
import { KeyboardAvoidingView, Platform, KeyboardAvoidingViewProps } from 'react-native';

export default function (props: KeyboardAvoidingViewProps) {
    const { children } = props;
    if (Platform.OS === 'android') {
        return children;
    }
    return (
        <KeyboardAvoidingView
            {...props}
        >
            {children}
        </KeyboardAvoidingView>
    );
}
