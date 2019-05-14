/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';

type Props = {
    loading: Boolean
}

export default function (props: TouchableOpacityProps | Props) {
    const {
        children, loading, style, onPress
    } = props;

    return (
        <TouchableOpacity
            style={[style]}
            onPress={() => {
                if (!loading) {
                    onPress();
                }
            }}
        >
            <View style={styles.childContainer}>
                {
                    props.loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                            children
                        )
                }
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    childContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
