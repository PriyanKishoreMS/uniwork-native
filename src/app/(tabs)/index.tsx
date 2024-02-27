import {
	StyleSheet,
	ScrollView,
	FlatList,
	useColorScheme,
	Image,
	TouchableOpacity,
	Pressable,
	TouchableNativeFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tasks, TaskCategories } from "../../../temp/tasks";
import Colors, { palette } from "@/constants/Colors";
import { useWindowDimensions } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import ImageSlider from "@/components/custom/ImageSlider";

function formatTime(timestamp: string): string {
	const currentDate = new Date();
	const providedDate = new Date(
		timestamp.replace(" ", "T").replace(/\+\d+/, "")
	);

	const timeDifference = currentDate.getTime() - providedDate.getTime();

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
	} else if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
	} else if (hours < 24) {
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	} else {
		return `${days} day${days !== 1 ? "s" : ""} ago`;
	}
}

const TasksScreen = () => {
	const colorScheme = useColorScheme();
	var { height } = useWindowDimensions();
	const [selected, setSelected] = useState("All");

	return (
		<SafeAreaView
			style={{
				height: height,
				backgroundColor:
					colorScheme === "dark"
						? Colors.dark.tabBackground
						: Colors.light.tabBackground,
			}}
		>
			<View
				style={{
					backgroundColor:
						colorScheme === "dark"
							? Colors.dark.tabBackground
							: Colors.light.tabBackground,
				}}
			>
				<Text style={styles.title}>Categories</Text>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={TaskCategories}
					renderItem={({ item }) => (
						<View
							style={{
								margin: 6,
								borderRadius: 12,
							}}
						>
							<TouchableOpacity
								onPress={() => setSelected(item)}
								style={{
									borderWidth: 1,
									borderRadius: 12,
									borderColor: palette.primary,
									padding: 8,
									backgroundColor:
										selected === item ? palette.primary : palette.transparent,
									paddingHorizontal: 16,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={styles.para}>{item}</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
			<View style={styles.container}>
				<FlatList
					data={tasks}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View
							style={{
								borderBottomWidth: 1,
								borderColor: palette.grayLight,
							}}
						>
							<View>
								<View
									style={{
										margin: 16,
									}}
								>
									<TouchableOpacity>
										<View style={styles.userContainer}>
											<View style={styles.userDetails}>
												<Image
													source={{ uri: item.avatar }}
													style={{
														width: 32,
														height: 32,
														borderRadius: 20,
													}}
												/>
												<Text style={styles.name}>{item.name}</Text>
												<Entypo
													name='dot-single'
													size={24}
													color={palette.grayLight2}
												/>
												<Text>{formatTime(item.created_at)}</Text>
											</View>
											<View>
												<Text>₹{item.price}</Text>
											</View>
										</View>
										<Text style={styles.heading}>{item.title}</Text>
										<Text style={styles.desc}>{item.description}</Text>
									</TouchableOpacity>
								</View>
								{item?.images && item.images.length > 0 && (
									<View>
										<ImageSlider images={item.images} />
									</View>
								)}
							</View>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 24,
		paddingLeft: 16,
		fontFamily: "InterBold",
	},
	para: {
		fontSize: 15,
		fontFamily: "Inter",
	},
	userDetails: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	userContainer: {
		marginBottom: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	name: {
		fontSize: 16,
		fontFamily: "InterSemiBold",
		marginLeft: 8,
	},
	heading: {
		fontSize: 24,
		fontFamily: "InterBold",
	},
	desc: {
		fontSize: 15,
		fontFamily: "Inter",
		marginTop: 4,
	},
});

export default TasksScreen;
