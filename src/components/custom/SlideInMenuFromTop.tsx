import React, { useState, useEffect, useRef } from "react";
import {
	Animated,
	StyleSheet,
	Easing,
	Platform,
	ViewProps,
} from "react-native";

const OPEN_ANIM_DURATION = 225;
const CLOSE_ANIM_DURATION = 195;
const USE_NATIVE_DRIVER = Platform.OS !== "web";

export const computePosition = ({ windowLayout, optionsLayout }: any) => {
	const top = 0;
	const left = 0;
	return { top, left };
};

interface SlideInMenuFromTopProps extends ViewProps {
	layouts: any;
}

const SlideInMenuFromTop: React.FC<SlideInMenuFromTopProps> = ({
	style,
	children,
	layouts,
	...other
}) => {
	const slideAnim = useRef(new Animated.Value(0)).current;
	const [animationStarted, setAnimationStarted] = useState(false);

	useEffect(() => {
		if (!animationStarted) {
			Animated.timing(slideAnim, {
				duration: OPEN_ANIM_DURATION,
				toValue: 1,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}).start();
			setAnimationStarted(true);
		}
	}, [animationStarted, slideAnim]);

	const close = () => {
		return new Promise(resolve => {
			Animated.timing(slideAnim, {
				duration: CLOSE_ANIM_DURATION,
				toValue: 0,
				easing: Easing.in(Easing.cubic),
				useNativeDriver: USE_NATIVE_DRIVER,
			}).start(resolve);
		});
	};

	const { height: oHeight } = layouts.optionsLayout;
	const { width } = layouts.windowLayout;
	const { height: tHeight, y: tY } = layouts.triggerLayout;

	const animation = {
		transform: [
			{
				translateY: slideAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [-oHeight, tHeight + tY],
				}),
			},
		],
	};

	const position = computePosition(layouts);

	return (
		<Animated.View
			style={[styles.options, { width }, style, animation, position]}
			{...other}
		>
			{children}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	options: {
		position: "absolute",
		backgroundColor: "white",

		// Shadow only works on iOS.
		shadowColor: "black",
		shadowOpacity: 0.3,
		shadowOffset: { width: 3, height: 3 },
		shadowRadius: 4,

		// This will elevate the view on Android, causing shadow to be drawn.
		elevation: 5,
	},
});

export default SlideInMenuFromTop;
