import {
	StyleSheet,
	FlatList,
	useColorScheme,
	Image,
	View as DefaultView,
	TouchableOpacity,
	TouchableNativeFeedback,
	Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tasks, TaskCategories } from "../../../temp/tasks";
import Colors, { palette } from "@/constants/Colors";
import { useWindowDimensions } from "react-native";
import { Pressable, Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import ImageSlider from "@/components/custom/ImageSlider";
import {
	convertColorIntensity,
	formatTime,
	limitDescription,
	changeOpacity,
} from "@/utils";
import StarRating from "@/components/custom/StarRating";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { categoryColors } from "@/constants/Colors";
import FastImage from "react-native-fast-image";
import { TaskPopupMenu } from "@/components/custom/DropDowns";
import { Link, router } from "expo-router";
import { tasksProps, TaskCategory } from "@/types";

const TasksScreen = () => {
	const colorScheme = useColorScheme();
	var { height } = useWindowDimensions();
	const [category, setCategory] = useState("All");
	const [task, setTask] = useState<tasksProps[] | null>(tasks);
	const [scope, setScope] = useState<"college" | "Public">("college");

	const [isDisplayCategory, setIsDisplayCategory] = useState(false);
	const [isDisplayScope, setIsDisplayScope] = useState(false);
	const [animatedViewCategory] = useState(new Animated.Value(0));
	const [animatedViewScope] = useState(new Animated.Value(0));
	const [animatedViewInterpolateCategory] = useState(
		animatedViewCategory.interpolate({
			inputRange: [0, 180],
			outputRange: [0, 100],
		})
	);

	const [animatedViewInterpolateScope] = useState(
		animatedViewScope.interpolate({
			inputRange: [0, 180],
			outputRange: [0, 100],
		})
	);
	const animateDuration = 300;

	const closeCategory = () => {
		Animated.timing(animatedViewCategory, {
			toValue: 0,
			duration: animateDuration,
			useNativeDriver: false,
		}).start(() => {
			setIsDisplayCategory(false);
		});
	};

	const closeScope = () => {
		Animated.timing(animatedViewScope, {
			toValue: 0,
			duration: animateDuration,
			useNativeDriver: false,
		}).start(() => {
			setIsDisplayScope(false);
		});
	};

	const handleShowCategories = () => {
		if (isDisplayCategory) {
			Animated.timing(animatedViewCategory, {
				toValue: 0,
				duration: animateDuration,
				useNativeDriver: false,
			}).start(() => {
				setIsDisplayCategory(false);
			});
		} else {
			if (isDisplayScope) {
				closeScope(); // Close the scope view first
			}
			Animated.timing(animatedViewCategory, {
				toValue: 100,
				duration: animateDuration,
				useNativeDriver: false,
			}).start(() => {
				setIsDisplayCategory(true);
			});
		}
	};

	const handleShowScope = () => {
		if (isDisplayScope) {
			Animated.timing(animatedViewScope, {
				toValue: 0,
				duration: animateDuration,
				useNativeDriver: false,
			}).start(() => {
				setIsDisplayScope(false);
			});
		} else {
			if (isDisplayCategory) {
				closeCategory(); // Close the category view first
			}

			Animated.timing(animatedViewScope, {
				toValue: 175,
				duration: animateDuration,
				useNativeDriver: false,
			}).start(() => {
				setIsDisplayScope(true);
			});
		}
	};

	useEffect(() => {
		return () => {
			animatedViewCategory.stopAnimation();
			animatedViewScope.stopAnimation();
		};
	}, []);

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
						marginHorizontal: 16,
						marginBottom: 8,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							borderWidth: 1,
							borderRadius: 12,
							borderColor: palette.primary,
						}}
					>
						<Pressable
							style={{
								padding: 4,
								flexDirection: "row",
								alignItems: "center",
							}}
							onPress={handleShowScope}
						>
							{scope === "Public" ? (
								<MaterialCommunityIcons
									name='earth'
									size={18}
									color={palette.primary}
									marginLeft={4}
								/>
							) : (
								<MaterialCommunityIcons
									name='school'
									size={18}
									color={palette.primary}
									marginLeft={4}
								/>
							)}
							<Text
								style={{
									fontSize: 18,
									paddingHorizontal: 8,
									fontFamily: "InterBold",
									textTransform: "capitalize",
								}}
							>
								{scope}
							</Text>
							{isDisplayScope ? (
								<MaterialCommunityIcons
									name='chevron-up'
									size={24}
									color={colorScheme === "dark" ? palette.white : palette.black}
								/>
							) : (
								<MaterialCommunityIcons
									name='chevron-down'
									size={24}
									color={colorScheme === "dark" ? palette.white : palette.black}
								/>
							)}
						</Pressable>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 8,
						}}
					>
						<Pressable
							style={{
								padding: 4,
								flexDirection: "row",
								alignItems: "center",
							}}
							onPress={handleShowCategories}
						>
							<Text
								style={{
									fontSize: 12,
									fontFamily: "InterSemiBold",
									color: palette.primary,
									paddingHorizontal: 8,
								}}
							>
								{category}
							</Text>
							<Ionicons
								name='options-outline'
								size={24}
								color={colorScheme === "dark" ? palette.white : palette.black}
							/>
						</Pressable>
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
					</View>
				</DefaultView>
				<Animated.View
					style={{
						height: animatedViewInterpolateScope,
						marginHorizontal: 16,
						gap: 2,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setScope("Public");
							closeScope();
						}}
						style={styles.scopeTOContainer}
					>
						<MaterialCommunityIcons
							name='earth'
							size={24}
							color={palette.primary}
							style={{ top: 5 }}
						/>
						<Text style={styles.scopeText}>Public</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setScope("college");
							closeScope();
						}}
						style={styles.scopeTOContainer}
					>
						<MaterialCommunityIcons
							name='school'
							size={24}
							color={palette.primary}
							style={{ top: 5 }}
						/>
						<Text style={styles.scopeText}>College</Text>
					</TouchableOpacity>
				</Animated.View>
				<Animated.View style={{ height: animatedViewInterpolateCategory }}>
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
									onPress={() => {
										setCategory(item);
										closeCategory();
									}}
									style={{
										borderWidth: 1,
										borderRadius: 12,
										borderColor: palette.primary,
										padding: 8,
										backgroundColor:
											category === item ? palette.primary : palette.transparent,
										paddingHorizontal: 16,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text
										style={[
											styles.para,
											category === item && { color: palette.black },
										]}
									>
										{item}
									</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
				</Animated.View>
			</View>
			<View style={styles.container}>
				<FlatList
					data={task}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View
							style={{
								borderBottomWidth: 0.7,
								borderColor: palette.grayLight,
							}}
						>
							<TouchableNativeFeedback
								onPress={() => {
									router.push({
										pathname: "/pages/taskDetails",
										params: {
											itemId: item.id,
										},
									});
								}}
								background={TouchableNativeFeedback.Ripple(
									changeOpacity(palette.primary, 0.2),
									false
								)}
								useForeground={true}
							>
								<View>
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
													<Text style={styles.name}>
														{limitDescription(item.name, 25)}
													</Text>
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
													borderColor: convertColorIntensity(
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
														color: convertColorIntensity(
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
								</View>
							</TouchableNativeFeedback>
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
		// alignItems: "center",
	},
	scopeText: {
		fontSize: 18,
		paddingHorizontal: 8,
		paddingVertical: 4,
		fontFamily: "Inter",
	},
	scopeTOContainer: {
		flexDirection: "row",
		gap: 8,
		marginTop: 4,
		// backgroundColor: palette.grayDark,
		borderRadius: 12,
		paddingLeft: 8,
		padding: 2,
		// justifyContent: "center",
	},
});

export default TasksScreen;
