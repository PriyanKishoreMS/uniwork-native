import { StyleSheet, useColorScheme, Image, View as DView } from "react-native";
import { View, Text, Pressable as ThemedPressable } from "@/components/Themed";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { Pressable, ScrollView, TextInput } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors, { palette } from "@/constants/Colors";
import ImageSlider from "@/components/custom/ImageSlider";
import { router } from "expo-router";
import { convertColorIntensity, limitDescription } from "@/utils";
import { tasks } from "../../../temp/tasks";
import { categoryColors } from "@/constants/Colors";
import StarRating from "@/components/custom/StarRating";

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

interface tasksProps {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	status: string;
	created_at: string;
	expiry: string;
	images?: string[];
	files?: string[];
	name: string;
	avatar: string;
	rating: number;
}

const task = () => {
	const { itemId } = useLocalSearchParams();
	const { height } = useWindowDimensions();
	const colorScheme = useColorScheme();
	const data = tasks.find(task => task.id === Number(itemId));
	// const [loading, setLoading] = useState<loadingStates>({
	// 	images: null,
	// 	files: null,
	// });

	const handleGoBack = () => {
		router.back();
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				height: height,
				backgroundColor:
					colorScheme === "dark"
						? Colors.dark.background
						: Colors.light.background,
			}}
		>
			<View
				style={{
					flex: 1,
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 16,
						alignItems: "center",
						justifyContent: "space-between",
						marginVertical: 8,
					}}
				>
					<MaterialIcons
						onPress={handleGoBack}
						name='arrow-back-ios-new'
						size={25}
						color={colorScheme === "dark" ? palette.white : palette.black}
					/>

					<View style={styles.userDetails}>
						<View
							style={{
								alignItems: "flex-start",
								justifyContent: "flex-start",
								marginBottom: 8,
							}}
						>
							<Text style={styles.name}>
								{limitDescription(String(data?.name), 25)}
							</Text>
							<StarRating rating={Number(data?.rating)} size={15} />
						</View>
						<Image
							source={{ uri: data?.avatar }}
							style={{
								width: 40,
								height: 40,
								borderRadius: 20,
								marginLeft: 12,
							}}
						/>
					</View>
				</View>
				<ScrollView>
					<View style={styles.container}>
						<Text
							style={[
								styles.textInput,
								{
									color: colorScheme === "dark" ? palette.white : palette.black,
									fontFamily: "InterSemiBold",
									fontSize: 30,
									marginBottom: 12,
								},
							]}
						>
							{data?.title}
						</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<View
								style={[
									styles.category,
									{
										borderColor: convertColorIntensity(
											categoryColors[data?.category as TaskCategory],
											-40
										),
										backgroundColor:
											categoryColors[data?.category as TaskCategory],
									},
								]}
							>
								<Text
									style={[
										styles.categoryText,
										{
											color: convertColorIntensity(
												categoryColors[data?.category as TaskCategory],
												-60
											),
										},
									]}
								>
									{data?.category}
								</Text>
							</View>
							<View
								style={[
									styles.priceView,
									{
										backgroundColor:
											colorScheme === "dark"
												? palette.grayDark
												: palette.transparent,
									},
								]}
							>
								<MaterialIcons
									name='currency-rupee'
									size={20}
									color={convertColorIntensity(palette.green, 20)}
								/>
								<Text
									style={{
										color:
											colorScheme === "dark" ? palette.white : palette.black,
										fontFamily: "Inter",
										padding: 2,
										borderColor: palette.green,
										fontSize: 16,
									}}
								>
									{data?.price}
								</Text>
							</View>
						</View>

						<Text
							style={[
								styles.textInput,
								{
									color: colorScheme === "dark" ? palette.white : palette.black,
									fontFamily: "Inter",
									fontSize: 18,
								},
							]}
						>
							{data?.description}
						</Text>
					</View>
					{/* {loading.images === true ? (
						<View style={styles.loader}>
							<ActivityIndicator size='large' color={palette.primary} />
							<Text style={styles.loadingText}>Loading Images</Text>
						</View>
					) : ( */}
					{data?.images != undefined && (
						<View
							style={{
								marginVertical: 16,
							}}
						>
							<ImageSlider images={data?.images} />
						</View>
					)}
					{/* )} */}
					{/* {loading.files === true ? (
						<View style={styles.loader}>
							<ActivityIndicator size='large' color={palette.primary} />
							<Text style={styles.loadingText}>Loading Files</Text>
						</View>
					) : (
						files && ( */}
					<View
						style={{
							margin: 16,
						}}
					>
						{/* <Text
							style={{
								fontFamily: "InterSemiBold",
								fontSize: 20,
								color: colorScheme === "dark" ? palette.white : palette.black,
							}}
						>
							Files
						</Text> */}
						{/* <View style={styles.filesContainer}>
							{files.map((file, index) => (
								<View
									key={index}
									style={[
										styles.filesBox,
										{
											backgroundColor:
												colorScheme === "dark"
													? palette.grayDark
													: palette.grayLight2,
										},
									]}
								>
									<MaterialCommunityIcons
										name='file-document-outline'
										size={24}
										color={
											colorScheme === "dark" ? palette.white : palette.black
										}
										style={{
											marginRight: 4,
										}}
									/>
									<Text
										style={{
											fontFamily: "Inter",
											fontSize: 16,
											color:
												colorScheme === "dark" ? palette.white : palette.black,
										}}
									>
										{file.name}
									</Text>
								</View>
							))}
						</View> */}
					</View>
				</ScrollView>
			</View>
			<View
				style={{
					justifyContent: "center",
					width: "100%",
					backgroundColor: "transparent",
				}}
			>
				<Pressable
					android_ripple={{
						color: convertColorIntensity(palette.green, -40),
						borderless: false,
					}}
					style={{
						flexDirection: "row",
						backgroundColor: palette.green,
						padding: 8,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<MaterialIcons name='task-alt' size={30} color={palette.white} />
					<Text
						style={{
							fontFamily: "InterSemiBold",
							fontSize: 20,
							color: palette.white,
							marginLeft: 8,
						}}
					>
						Take up task
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16,
	},
	textInput: {
		width: "90%",
		alignItems: "flex-start",
		textAlignVertical: "top",
		textAlign: "left",
		maxHeight: 500,
		marginTop: 12,
	},
	filesInput: {
		padding: 8,
	},
	filesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 12,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 12,
	},
	filesBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		borderRadius: 12,
	},
	priceView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		paddingHorizontal: 12,
		borderColor: palette.green,
		borderRadius: 20,
	},
	loader: {
		flex: 1,
		marginTop: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginLeft: 12,
		fontFamily: "InterLight",
		fontSize: 18,
	},
	categoryText: {
		fontSize: 16,
		fontFamily: "InterSemiBold",
	},
	category: {
		borderWidth: 2,
		// marginHorizontal: 16,
		paddingHorizontal: 8,
		borderRadius: 18,
		padding: 2,
		backgroundColor: palette.primary,
		alignSelf: "flex-start",
		// marginVertical: 8,
	},

	userDetails: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		borderWidth: 1,
		borderRadius: 12,
		borderColor: palette.grayLight,
		padding: 8,
	},
	name: {
		fontSize: 16,
		fontFamily: "InterSemiBold",
		marginLeft: 12,
	},
});

export default task;
