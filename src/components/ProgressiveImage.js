import React from 'react';
import {
    View, StyleSheet, Animated, ImageProps, ViewStyle
} from 'react-native';
import Image from 'react-native-fast-image';

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: '#e1e4e8',
    },
});

type Props = {
    thumbnailSource: String,
    containerStyle: ViewStyle,
    useFastImage: Boolean
}
class ProgressiveImage extends React.PureComponent<Props | ImageProps> {
    thumbnailAnimated = new Animated.Value(0);

    imageAnimated = new Animated.Value(0);

    state = {
        imageLoad: false,
    }

    handleThumbnailLoad = () => {
        const animatedValue = Animated.timing(this.thumbnailAnimated, {
            toValue: 1,
        });
        animatedValue.start();
    }

    onImageLoad = () => {
        Animated.timing(this.imageAnimated, {
            toValue: 1,
        }).start(
            () => {
                this.setState({
                    imageLoad: true,
                });
            }
        );
    }

    render() {
        const {
            thumbnailSource,
            source,
            style,
            containerStyle,
            useFastImage,
            ...props
        } = this.props;
        const { imageLoad } = this.state;
        return (
            <View style={[styles.container, style, containerStyle]}>
                {
                    !imageLoad && thumbnailSource && (
                        <Animated.Image
                            {...props}
                            source={thumbnailSource}
                            style={[style, { opacity: this.thumbnailAnimated }]}
                            onLoad={this.handleThumbnailLoad}
                            blurRadius={1}
                        />
                    )
                }

                <Animated.Image
                    {...props}
                    source={source}
                    style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
                    onLoad={this.onImageLoad}
                />
            </View>
        );
    }
}

export default ProgressiveImage;
