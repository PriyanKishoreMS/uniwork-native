import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAuth } from "@/components/contexts/AuthContext";
import { Redirect } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

const NotificationScreen = () => {
	const { signedIn, isLoading } = useAuth();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!signedIn) {
		console.log(signedIn, "signedIn status");
		return <Redirect href={"/(public)/signin"} />;
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Notification Screen</Text>
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
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
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

export default NotificationScreen;
