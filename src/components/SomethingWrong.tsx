import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

const SomethingWrong = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Something Wrong</Text>
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
		fontFamily: "InterBold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

export default SomethingWrong;
