import React from "react";
import { StyleSheet, Pressable, useColorScheme } from "react-native";
import { View, Text } from "@/components/Themed";
import PropTypes from "prop-types";
import { palette } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const radioButtonSize = 16;

interface RadioButtonProps {
	isSelected: boolean;
	onPress: () => void;
	text: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
	isSelected,
	onPress,
	text,
}) => {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.radioContainer}>
			<View
				style={[
					styles.radioBorder,
					colorScheme === "dark"
						? { borderColor: palette.white }
						: { borderColor: palette.black },
				]}
			>
				<Pressable style={styles.radioButton} onPress={onPress}>
					{isSelected && (
						<MaterialIcons
							name='check'
							size={radioButtonSize}
							color={palette.primaryDark}
						/>
					)}
				</Pressable>
			</View>
			<Text
				style={{
					fontSize: 14,
					fontFamily: "Inter",
				}}
			>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	radioContainer: {
		paddingHorizontal: 24,
		flexDirection: "row",
		marginBottom: 16,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	radioButton: {
		height: radioButtonSize,
		width: radioButtonSize,
		alignItems: "center",
		justifyContent: "center",
	},
	radioBorder: {
		borderWidth: 1,
		borderRadius: 6,
		padding: 1,
		marginRight: 6,
	},
});

RadioButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	isSelected: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
};

export default RadioButton;
