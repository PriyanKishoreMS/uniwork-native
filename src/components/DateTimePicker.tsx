import { palette } from "@/constants/Colors";
import { FormData } from "@/types";
import {
	convertColorIntensity,
	formatDateTime,
	formatFutureTime,
} from "@/utils";
import React, { useState } from "react";
import { ColorSchemeName, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Pressable, Text, View } from "./Themed";

type DateTimePickerProps = {
	colorScheme: ColorSchemeName;
	data: FormData;
	setData: React.Dispatch<React.SetStateAction<FormData>>;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
	colorScheme,
	data,
	setData,
}) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [dateTime, setDateTime] = useState<string>("");
	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: Date) => {
		setData({ ...data, expiry: String(date) });
		console.log(date, "date here");
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
						? "Set Deadline"
						: "Expires on " +
						  formatDateTime(dateTime).date +
						  " at " +
						  formatDateTime(dateTime).time}
				</Text>
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode='datetime'
					isDarkModeEnabled={colorScheme === "dark" ? true : false}
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
