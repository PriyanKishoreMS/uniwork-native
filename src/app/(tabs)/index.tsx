import {
	StyleSheet,
	FlatList,
	useColorScheme,
	Image,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tasks, TaskCategories } from "../../../temp/tasks";
import Colors, { palette } from "@/constants/Colors";
import { useWindowDimensions } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import ImageSlider from "@/components/custom/ImageSlider";
import { DarkenColor, formatTime } from "@/components/Helper";
import StarRating from "@/components/custom/StarRating";
import { categoryColors } from "@/constants/Colors";

enum TaskCategory {
	AcademicAssistance = "Academic Assistance",
	TutorHomeVirtual = "Tutor Home/Virtual",
	BooksRentBuy = "Books Rent/Buy",
	VehicleRent = "Vehicle Rent",
	DocumentPrinting = "Document Printing",
	ResumeCreation = "Resume Creation",
	JobSearchSupport = "Job Search Support",
	GroceryShopping = "Grocery Shopping",
	Fashion = "Fashion",
	SocialMedia = "Social Media",
	ITSupport = "IT Support",
	GraphicDesign = "Graphic Design",
	Delivery = "Delivery",
	RideSharing = "Ride sharing",
	CateringCooking = "Catering/Cooking",
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
								<Text
									style={[
										styles.para,
										selected === item && { color: palette.black },
									]}
								>
									{item}
								</Text>
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
								// paddingBottom: 16,
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
												<View
													style={{
														alignItems: "flex-start",
														justifyContent: "flex-start",
													}}
												>
													<Text style={styles.name}>{item.name}</Text>
													<StarRating rating={item.rating} />
												</View>
											</View>
											<View>
												<Text style={styles.para}>₹{item.price}</Text>
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
							<View style={styles.footer}>
								<View
									style={[
										styles.category,
										{
											borderColor: DarkenColor(
												categoryColors[item.category as TaskCategory],
												-40
											),
											backgroundColor:
												categoryColors[item.category as TaskCategory],
										},
									]}
								>
									<Text
										style={[
											styles.categoryText,
											{
												color: DarkenColor(
													categoryColors[item.category as TaskCategory],
													-60
												),
											},
										]}
									>
										{item.category}
									</Text>
								</View>
								<View>
									<Text style={styles.time}>{formatTime(item.created_at)}</Text>
								</View>
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
	time: {
		fontSize: 12,
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
	categoryText: {
		fontSize: 12,
		fontFamily: "Inter",
	},
	category: {
		borderWidth: 2,
		padding: 4,
		paddingHorizontal: 8,
		borderRadius: 18,
		backgroundColor: palette.primary,
		alignSelf: "flex-start",
		marginVertical: 8,
		marginLeft: 8,
	},
	footer: {
		marginRight: 16,
		marginVertical: 4,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default TasksScreen;
