import {
	StyleSheet,
	FlatList,
	useColorScheme,
	Image,
	View as DefaultView,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tasks, TaskCategories } from "../../../temp/tasks";
import Colors, { palette } from "@/constants/Colors";
import { useWindowDimensions } from "react-native";
import { Pressable, Text, View } from "@/components/Themed";
import { useState } from "react";
import ImageSlider from "@/components/custom/ImageSlider";
import { DarkenColor, formatTime, limitDescription } from "@/utils";
import StarRating from "@/components/custom/StarRating";
import { categoryColors } from "@/constants/Colors";
import FastImage from "react-native-fast-image";
import { TaskPopupMenu } from "@/components/custom/DropDowns";

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
						? Colors.dark.background
						: Colors.light.background,
			}}
		>
			<View
				style={{
					backgroundColor:
						colorScheme === "dark"
							? Colors.dark.background
							: Colors.light.background,
				}}
			>
				<DefaultView
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginHorizontal: 8,
						marginBottom: 8,
					}}
				>
					<Text style={styles.title}>Categories</Text>
					<TouchableOpacity
						onPress={() => {
							console.log("Profile");
						}}
						style={{
							borderWidth: 1.2,
							borderColor: palette.primary,
							borderRadius: 18,
						}}
					>
						<FastImage
							source={{
								uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
							}}
							style={{
								width: 32,
								height: 32,
								borderRadius: 16,
								margin: 2,
							}}
						/>
					</TouchableOpacity>
				</DefaultView>
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
								borderBottomWidth: 0.7,
								borderColor: palette.grayLight,
							}}
						>
							<View>
								<TouchableOpacity>
									<View
										style={{
											margin: 16,
										}}
									>
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
											<View style={styles.moneyContainer}>
												<Text style={styles.currencyText}>₹</Text>
												<Text style={styles.para}>{item.price}</Text>
												<View
													style={{
														marginLeft: 12,
														marginRight: -8,
													}}
												>
													<Pressable>
														<TaskPopupMenu
															taskId={item.id}
															colorScheme={colorScheme}
														/>
													</Pressable>
												</View>
											</View>
										</View>
										<Text style={styles.heading}>{item.title}</Text>
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
										{item?.description && (
											<Text style={styles.desc}>
												{limitDescription(item?.description, 150)}
											</Text>
										)}
									</View>
									{item?.images && item.images.length > 0 && (
										<View>
											<ImageSlider images={item.images} />
										</View>
									)}
									<View style={styles.footer}>
										<View>
											<Text style={styles.time}>
												{formatTime(item.created_at)}
											</Text>
										</View>
									</View>
								</TouchableOpacity>
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
		padding: 2,
		paddingHorizontal: 8,
		borderRadius: 18,
		alignSelf: "flex-start",
		marginVertical: 8,
	},
	moneyContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	currencyText: {
		fontSize: 20,
		color: palette.green,
		marginRight: 5,
	},
	footer: {
		margin: 12,
		marginRight: 16,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});

export default TasksScreen;
