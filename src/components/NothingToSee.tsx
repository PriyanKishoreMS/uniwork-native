import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "./Themed";
import { palette } from "@/constants/Colors";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NothingToSee = () => {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.container}>
			<MaterialCommunityIcons
				name='file-search-outline'
				size={100}
				color={colorScheme === "dark" ? palette.white : palette.gray}
				style={styles.notFoundIcon}
			/>
			<Text style={styles.heading}>Nothing to see here yet,</Text>
			<Text style={styles.heading}>Come again later!</Text>
		</View>
	);
};

export default NothingToSee;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	heading: {
		fontSize: 20,
		fontFamily: "InterBold",
	},
	notFoundIcon: {
		margin: 20,
	},
});
