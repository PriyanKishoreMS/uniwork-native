import { StyleSheet, ScrollView } from "react-native";
import { tasks } from "../../../temp/tasks";
import { router } from "expo-router";
import { palette } from "@/constants/Colors";
import { useWindowDimensions } from "react-native";
import { Text, View, Pressable } from "@/components/Themed";

const TasksScreen = () => {
	var { height } = useWindowDimensions();
	return (
		<ScrollView>
			<View
				style={[
					styles.container,
					{
						height: height,
					},
				]}
			></View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default TasksScreen;
