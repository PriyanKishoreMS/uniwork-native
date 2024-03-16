import { StyleSheet, ColorSchemeName } from "react-native";
import React, { useState } from "react";
import { FormData } from "@/types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Pressable, View, Text } from "./Themed";
import {
	formatFutureTime,
	formatDateTime,
	convertColorIntensity,
} from "@/utils";
import { palette } from "@/constants/Colors";

type DateTimePickerProps = {
	colorScheme: ColorSchemeName;
	data: FormData;
	setData: React.Dispatch<React.SetStateAction<FormData>>;
};

const DateTimePicker: React.FC<DateTimePickerProps> = () => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [dateTime, setDateTime] = useState<string>("");

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: Date) => {
		console.log("A date has been picked: ", formatFutureTime(String(date)));
		setDateTime(String(date));
		hideDatePicker();
	};
	return (
		<View style={styles.container}>
			<Pressable
				onPress={showDatePicker}
				style={[
					styles.dateTimePressable,
					{
						borderColor: convertColorIntensity(palette.red, -30),
					},
				]}
			>
				<Text style={styles.dateTimeText}>
					{dateTime === ""
						? "Set Expiry"
						: "Expires on " + formatDateTime(dateTime)}
				</Text>
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode='datetime'
					onConfirm={handleConfirm}
					onCancel={hideDatePicker}
				/>
			</Pressable>
		</View>
	);
};

export default DateTimePicker;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		margin: 16,
	},
	dateTimePressable: {
		borderWidth: 1,
		borderRadius: 16,
		padding: 4,
		paddingHorizontal: 8,
	},
	dateTimeText: {
		fontSize: 16,
		fontFamily: "InterSemiBold",
	},
});
