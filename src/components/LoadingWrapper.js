import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';


type Props = {
    loading: boolean,
    style: ViewStyle,
}
export default function LoadingWrapper(props: Props) {
    const { children, loading, style } = props;
    return (
        <SafeAreaView style={[styles.container, style]}>
            {loading ? <ActivityIndicator /> : children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
