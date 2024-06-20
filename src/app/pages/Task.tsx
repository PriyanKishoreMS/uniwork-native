import { TaskPopupMenu } from "@/components/custom/DropDowns";
import ImageSlider from "@/components/custom/ImageSlider";
import { Pressable, Text, View } from "@/components/Themed";
import { categoryColors, palette } from "@/constants/Colors";
import { TaskCategory } from "@/types";
import {
	convertColorIntensity,
	formatDateTime,
	formatPastTime,
	limitDescription,
} from "@/utils";
import { router } from "expo-router";
import React, { memo } from "react";
import {
	Image,
	StyleSheet,
	TouchableNativeFeedback,
	useColorScheme,
} from "react-native";

const Task = ({ item }: any) => {
	const colorScheme = useColorScheme();
	const createdAt = formatPastTime(item?.time);
	const deadlilne = formatDateTime(item?.expiry);
	return (
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
							itemId: item?.id,
						},
					});
				}}
				background={TouchableNativeFeedback.Ripple("#94D6F233", false)}
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
									source={{
										uri:
											item?.user_avatar && "default"
												? "https://via.placeholder.com/150"
												: item?.user_avatar,
									}}
									style={{
										width: 32,
										height: 32,
										borderRadius: 20,
									}}
								/>
								<View
									style={{
										alignItems: "baseline",
										justifyContent: "flex-start",
									}}
								>
									<Text style={styles.name}>
										{limitDescription(item?.user_name, 25)}
										{/* {item?.user_name} */}
									</Text>
									<Text
										style={[
											styles.time,
											{
												color: palette.grayLight2,
												marginLeft: 8,
											},
										]}
									>
										{createdAt.value}
										{createdAt.unit}
									</Text>
									{/* <StarRating rating={item?.rating} /> */}
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
											taskId={item?.id}
											colorScheme={colorScheme}
										/>
									</Pressable>
								</View>
							</View>
						</View>
						<Text style={styles.heading}>{item?.title}</Text>
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
								{item?.category}
							</Text>
						</View>
						{item?.description && (
							<Text style={styles.desc}>
								{limitDescription(item.description, 200)}
								{/* {item?.description} */}
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
							<Text
								style={[
									styles.time,
									{
										fontFamily: "InterSemiBold",
										color: palette.grayLight2,
									},
								]}
							>
								{deadlilne.date}
							</Text>
						</View>
					</View>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

export default memo(Task);

const styles = StyleSheet.create({
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
	},
});
