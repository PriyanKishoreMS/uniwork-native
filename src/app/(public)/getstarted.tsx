import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import React from "react";
import { router } from "expo-router";

const GetStartedScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Get Started Screen</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/signin")}
			>
				<Text>Get Started Bro</Text>
			</TouchableOpacity>
			<View lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	button: {
		alignItems: "center",
		marginTop: 20,
		backgroundColor: "#666666",
		padding: 5,
		paddingHorizontal: 0,
		borderRadius: 5,
		width: "100%",
	},
});

export default GetStartedScreen;
