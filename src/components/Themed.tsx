import {
	Text as DefaultText,
	View as DefaultView,
	TextInput as DefaultTextInput,
	TextInputProps as DefaultTextInputProps,
	Pressable as DefaultPressable,
	PressableProps as DefaultPressableProps,
	StyleSheet,
	ViewStyle,
} from "react-native";

import Colors, { palette } from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { DarkenColor } from "./Helper";

type TextInputProp = {
	borderDark?: string;
	borderLight?: string;
	bgDark?: string;
	bgLight?: string;
	icon?: React.ComponentProps<typeof MaterialIcons>["name"];
};

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

type PressableProp = {
	rippleColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = TextInputProp & ThemeProps & DefaultTextInputProps;
export type PressableProps = DefaultPressableProps & PressableProp;

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
	const theme = useColorScheme() ?? "light";
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background"
	);

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Pressable(props: PressableProps) {
	let { children, ...otherProps } = props;
	const flattenedStyle = StyleSheet.flatten(props.style as ViewStyle);
	const rippleColor = String(
		flattenedStyle?.backgroundColor || palette.primary
	);
	console.log(rippleColor);
	return (
		<View
			style={{
				borderRadius: 12,
				overflow: "hidden",
			}}
		>
			<DefaultPressable
				android_ripple={{
					color: DarkenColor(rippleColor, -40),
					borderless: false,
				}}
				{...otherProps}
			>
				{children}
			</DefaultPressable>
		</View>
	);
}

export function TextInput(props: TextInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const {
		style,
		lightColor,
		darkColor,
		borderDark,
		borderLight,
		bgDark,
		bgLight,
		...otherProps
	} = props;

	const borderColor = useThemeColor(
		{ light: borderLight, dark: borderDark },
		"borderColor"
	);
	const backgroundColor = useThemeColor(
		{ light: bgLight, dark: bgDark },
		"background"
	);
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
	const icon = props.icon;
	return (
		// position the icon at the beginning of the input
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{icon && (
				<MaterialIcons
					name={icon}
					size={24}
					color={isFocused ? palette.primary : palette.grayLight}
					style={{
						position: "absolute",
						left: 30,
						top: 18,
						zIndex: 1,
					}}
				/>
			)}
			<DefaultTextInput
				placeholderTextColor={isFocused ? palette.grayLight : color}
				style={[
					{
						borderColor,
						backgroundColor,
						color,
						paddingLeft: icon ? 50 : 10,
						flex: 1,
					},
					style,
					isFocused && {
						borderColor: palette.primary,
						borderWidth: 3,
					},
				]}
				selectionColor={color}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...otherProps}
			/>
		</View>
	);
}
