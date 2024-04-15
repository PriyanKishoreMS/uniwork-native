import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

const MyTaskTodo = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Task todo</Text>
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
		fontFamily: "InterSemiBold",
	},
});

export default MyTaskTodo;
