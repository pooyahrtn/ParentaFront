/* eslint-disable react/destructuring-assignment */
import React from 'react';
import FeathersIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { ViewStyle } from 'react-native';

type Props = {
    name: String,
    size: Number,
    color: String,
    iconType: 'feathers' | 'ion-icon',
    style: ViewStyle,
}
export default function Icon(props: Props) {
    const iconProps = {
        size: props.size ? props.size : 24,
        name: props.name,
        style: {
            width: props.size,
            height: props.size,
            textAlign: 'center',
            ...props.style
        },
        color: props.color ? props.color : 'black',
    };
    if (props.iconType === 'ion-icon') {
        return <IonIcon {...iconProps} />;
    }
    return <FeathersIcon {...iconProps} />;
}
