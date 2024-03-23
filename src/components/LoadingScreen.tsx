import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";

const LoadingScreen = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size='large' color='#0000ff' />
			<Text style={styles.loadingText}>Loading</Text>
		</View>
	);
};

export default LoadingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
	},
	loadingText: {
		marginLeft: 10,
		fontSize: 20,
		fontFamily: "InterSemiBold",
	},
});
