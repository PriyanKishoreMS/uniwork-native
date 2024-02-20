import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";

const SignInScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign in Screen</Text>
			<View lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default SignInScreen;
