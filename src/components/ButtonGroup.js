import React from 'react';
import {
    TouchableOpacity,
    StyleSheet, View, FlexStyle
} from 'react-native';
import Text from './Text';

type Props = {
    selectedIndex: Number,
    buttons: String[],
    containerStyle: FlexStyle,
    selectedBackgroundColor: String,
    selectedTextColor: String,
}

export default function ButtonGroup(props: Props) {
    const {
        containerStyle,
        buttons,
        selectedIndex,
        selectedBackgroundColor,
        selectedTextColor
    } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            {
                buttons.map((item, index) => (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { borderColor: selectedBackgroundColor },
                            index === 0 ? styles.leftButton : styles.middleButton,
                            index === buttons.length - 1 && styles.rightButton,
                            index === selectedIndex && { backgroundColor: selectedBackgroundColor }
                        ]}
                        key={String(index)}
                    >
                        <Text style={[index === selectedIndex ? { color: selectedTextColor } : { color: selectedBackgroundColor }]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

const borderWidth = 0.5;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth,
        padding: 5,
        flex: 1,
    },
    leftButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: borderWidth / 2,
        borderLeftWidth: 1,
    },
    middleButton: {
        borderLeftWidth: borderWidth / 2,
        borderRightWidth: borderWidth / 2,
    },
    rightButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: borderWidth / 2,
        borderRightWidth: borderWidth,
    },

});
