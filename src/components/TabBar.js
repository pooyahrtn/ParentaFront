import React from 'react';
import { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';
import CroppedImage from './CroppedImage';
import { TabBarBottomProps, NavigationRoute } from 'react-navigation';
const { width, height } = Dimensions.get('screen');
const tabBarHeight = 130;
const cropTop = height - tabBarHeight;


export default class TabBar extends React.Component {

    rotationAnimatedValue = new Animated.Value(0);
    circleOneRotation = this.rotationAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg']
    });
    circleTwoRotation = this.rotationAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['100deg', '1180deg']
    });
    circleThreeRotation = this.rotationAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['140deg', '500deg']
    });

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.rotationAnimatedValue, {
                toValue: 1,
                duration: 30000,
                // useNativeDriver: true,
                easing: Easing.linear,
            })
        ).start();
    }
    // Main function to render tabbar
    renderTabBarButton = (route: NavigationRoute, idx: any) => {
        const {
            activeTintColor,
            inactiveTintColor,
            navigation,
            getLabelText,
            renderIcon,
        } = this.props;
        const currentIndex = navigation.state.index;
        const color = currentIndex === idx ? activeTintColor : inactiveTintColor;
        const label = getLabelText({ route, focused: currentIndex === idx, index: idx });
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: containerSize,
                height: containerSize
            }} key={route.routeName}>
                <SmallCircle
                    rotation={this.circleOneRotation}
                />
                <SmallCircle
                    rotation={this.circleTwoRotation}
                />
                <SmallCircle
                    rotation={this.circleThreeRotation}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (currentIndex != idx) {
                            navigation.navigate(route.routeName);
                        }
                    }}
                    style={styles.button}
                >

                </TouchableOpacity>
            </View>

        );
    }

    render() {
        const { navigation, style } = this.props;
        const tabBarButtons = navigation.state.routes.map(this.renderTabBarButton);
        return (
            <SafeAreaView style={{
                paddingTop: 0,
                height: tabBarHeight
            }}>

                <CroppedImage
                    source={require('../assets/background.jpg')}
                    cropTop={cropTop}
                    cropLeft={0}
                    cropWidth={width}
                    cropHeight={tabBarHeight}
                    width={width}
                    height={height}
                    style={{ position: 'absolute' }}
                />
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                    {tabBarButtons}
                </View>
            </SafeAreaView>
        );
    }
}

const buttonRadius = 32;
const smallCircleRadius = 3;
const marginFromCircle = 4;
const containerSize = 2 * (buttonRadius + marginFromCircle + 2 * smallCircleRadius);

const SmallCircle = (props) => (
    <Animated.View
        style={{
            position: 'absolute',
            left: buttonRadius + marginFromCircle + smallCircleRadius,
            top: 0,
            bottom: 0,
            transform: [
                { rotateZ: props.rotation }
            ]
        }}
    >
        <View
            style={{
                width: smallCircleRadius * 2,
                height: smallCircleRadius * 2,
                borderRadius: smallCircleRadius,
                backgroundColor: 'white',
            }}
        />
    </Animated.View >
)



const styles = StyleSheet.create({
    button: {
        width: buttonRadius * 2,
        height: buttonRadius * 2,
        borderRadius: buttonRadius,
        backgroundColor: 'white',
    }
})