import React from 'react';
import { View} from 'react-native';
import Image from 'react-native-fast-image';

export default function (props) {
    return (
        <View style={[{
            overflow: 'hidden',
            height: props.cropHeight,
            width: props.cropWidth,
            backgroundColor: 'transparent'
        }, props.style]}>
            <Image style={{
                position: 'absolute',
                top: props.cropTop * -1,
                left: props.cropLeft * -1,
                width: props.width,
                height: props.height
            }}
                source={props.source}
                resizeMode={props.resizeMode}>
                {props.children}
            </Image>
        </View>
    );
}

