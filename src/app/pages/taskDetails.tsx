import { useAuth } from "@/components/contexts/AuthContext";
import ImageSlider from "@/components/custom/ImageSlider";
import StarRating from "@/components/custom/StarRating";
import LoadingScreen from "@/components/LoadingScreen";
import { Pressable as RPressable, Text, View } from "@/components/Themed";
import Colors, { categoryColors, palette } from "@/constants/Colors";
import { TaskCategory } from "@/types";
import {
	changeOpacity,
	convertColorIntensity,
	formatDateTime,
	formatFutureTime,
	formatPastTime,
	limitDescription,
} from "@/utils";
import { fetchOneTask, postTaskRequest, RespondTaskRequest } from "@/utils/api";
import {
	Entypo,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableOpacity,
	useColorScheme,
	useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const task = () => {
	const { itemId } = useLocalSearchParams();
	const itemIdNumber = Array.isArray(itemId)
		? parseInt(itemId.toString())
		: parseInt(itemId);
	const { height } = useWindowDimensions();
	const colorScheme = useColorScheme();
	const { userData } = useAuth();
	const queryClient = useQueryClient();
	const { setCheckout } = useAuth();

	const defaultAvatar =
		"https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";

	const { data: task, isLoading } = useQuery({
		queryKey: ["task", itemId],
		queryFn: () => fetchOneTask(itemIdNumber, userData?.accessToken as string),
		enabled: !!userData,
	});
	const data = task?.data;
	const createdAt = formatPastTime(data?.time);
	const deadline = formatDateTime(data?.expiry);
	const tillDeadline = formatFutureTime(data?.expiry);
	const taskOwner = data?.user_id;
	const currentUser = userData?.user?.id;
	const requested: boolean = data?.requesters?.some(
		(el: { userid: number | undefined }) => {
			return el.userid === currentUser;
		}
	);
	const approved: boolean = data?.requesters[0]?.status === "approved";

	console.log(data, "this is the data");

	const { mutateAsync: addTaskRequest } = useMutation({
		mutationFn: async () => {
			return await postTaskRequest(
				data?.id,
				userData?.user?.id as number,
				userData?.accessToken as string
			);
		},
		onSuccess: () => {
			console.log("Request Sent");
			queryClient.invalidateQueries({ queryKey: ["task", itemId] });
		},
	});

	const { mutateAsync: respondTaskRequest } = useMutation<
		unknown,
		unknown,
		{ requesterId: number; taskResponse: "approve" | "reject" }
	>({
		mutationFn: async ({ requesterId, taskResponse }) => {
			return await RespondTaskRequest(
				data?.id,
				requesterId as number,
				taskResponse,
				userData?.accessToken as string
			);
		},
		onSuccess: () => {
			console.log("Request Sent");
			queryClient.invalidateQueries({ queryKey: ["task", itemId] });
		},
	});

	const handleGoBack = () => {
		router.back();
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

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
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<MaterialIcons
							onPress={handleGoBack}
							name='arrow-back-ios-new'
							size={25}
							color={colorScheme === "dark" ? palette.white : palette.black}
						/>
						<Text
							style={{
								fontFamily: "InterSemiBold",
								fontSize: 16,
								marginLeft: 8,
							}}
						>
							{createdAt.value}
							{createdAt.unit}
						</Text>
					</View>
					{taskOwner === currentUser && (
						<RPressable style={styles.btnDelete}>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									color: palette.red,
									fontSize: 16,
									padding: 4,
									paddingHorizontal: 8,
								}}
							>
								Delete Task
							</Text>
						</RPressable>
					)}
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
									marginBottom: 16,
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
					) : ( */}
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "flex-start",
							marginHorizontal: 8,
							marginVertical: 8,
						}}
					>
						<MaterialCommunityIcons
							name='calendar-check-outline'
							size={24}
							color={palette.red}
							style={{
								marginHorizontal: 8,
							}}
						/>
						<View style={{ marginLeft: 4 }}>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									fontSize: 16,
								}}
							>
								Deadline: {deadline.date}, {deadline.time}
							</Text>
							<Text
								style={{
									fontFamily: "Inter",
									fontSize: 12,
									color: palette.grayLight2,
								}}
							>
								{tillDeadline} left
							</Text>
						</View>
					</View>

					<View
						style={{
							marginHorizontal: 12,
							borderRadius: 12,
							overflow: "hidden",
							borderWidth: 1,
							borderColor: palette.grayLight,
							marginVertical: 16,
						}}
					>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								changeOpacity(palette.primary, 0.2),
								false
							)}
							useForeground={true}
							onPress={() => {
								router.push({
									pathname: "/pages/otherProfile",
									params: {
										UserId: data?.user_id,
									},
								});
							}}
						>
							<View style={styles.userDetails}>
								<Image
									source={{
										uri:
											data?.user_avatar == "default"
												? defaultAvatar
												: data?.avatar,
									}}
									style={{
										width: 60,
										height: 60,
										borderRadius: 30,
										marginLeft: 4,
									}}
								/>
								<View
									style={{
										alignItems: "flex-start",
										justifyContent: "flex-start",
										marginBottom: 8,
									}}
								>
									<Text style={styles.name}>
										{limitDescription(String(data?.user_name), 25)}
									</Text>
									<Text
										style={{
											fontFamily: "Inter",
											fontSize: 12,
											marginLeft: 12,
										}}
									>
										{data?.college_name}
									</Text>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "flex-start",
											marginTop: 4,
										}}
									>
										<StarRating rating={Number(data?.rating)} size={15} />
										<Entypo
											name='dot-single'
											size={15}
											color={palette.gray}
											style={{
												marginLeft: 1,
											}}
										/>
										<Text
											style={{
												fontFamily: "Inter",
												fontSize: 12,
												marginLeft: 1,
											}}
										>
											12 ratings
										</Text>
									</View>
								</View>
							</View>
						</TouchableNativeFeedback>
					</View>
					{data?.files && (
						<View
							style={{
								margin: 16,
							}}
						>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									fontSize: 20,
									color: colorScheme === "dark" ? palette.white : palette.black,
								}}
							>
								File Attachments
							</Text>
							<View style={styles.filesContainer}>
								{data?.files.map((file: string, index: number) => (
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
													colorScheme === "dark"
														? palette.white
														: palette.black,
											}}
										>
											{file}
										</Text>
									</View>
								))}
							</View>
						</View>
					)}
					{data?.requesters?.length === 0 ? (
						<View
							style={{
								// backgroundColor: palette.gray,
								alignItems: "center",
								justifyContent: "center",
								padding: 8,
								marginVertical: 16,
							}}
						>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									fontSize: 20,
								}}
							>
								No Requests Yet
							</Text>
						</View>
					) : taskOwner !== currentUser ? (
						<View style={styles.requesterView}>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									fontSize: 20,
									color: colorScheme === "dark" ? palette.white : palette.black,
								}}
							>
								Task Requests
							</Text>
							{data?.requesters?.map(
								(requester: {
									avatar: string;
									id: number;
									userid: number;
									name: string;
									status: string;
								}) => (
									<TouchableOpacity
										onPress={() => {
											router.push({
												pathname: "/pages/otherProfile",
												params: {
													UserId: requester?.userid,
												},
											});
										}}
										key={requester.id}
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
											marginVertical: 8,
										}}
									>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "flex-start",
											}}
										>
											<Image
												source={{
													uri:
														requester?.avatar == "default"
															? defaultAvatar
															: data?.avatar,
												}}
												style={{
													width: 30,
													height: 30,
													borderRadius: 15,
													marginLeft: 4,
												}}
											/>
											<Text
												style={{
													fontFamily: "Inter",
													fontSize: 16,
													marginLeft: 12,
												}}
											>
												{requester?.name}
											</Text>
										</View>
										<View
											style={{
												borderWidth: 1,
												borderColor:
													requester?.status == "pending"
														? palette.yellow
														: palette.success,
												backgroundColor:
													requester?.status == "pending"
														? palette.yellow
														: palette.success,
												borderRadius: 18,
												padding: 4,
											}}
										>
											<Text
												style={{
													fontFamily: "Inter",
													fontSize: 12,
													color: palette.black,
													letterSpacing: 0.5,
												}}
											>
												{requester?.status == "pending"
													? "Requested"
													: "Accepted"}
											</Text>
										</View>
									</TouchableOpacity>
								)
							)}
						</View>
					) : (
						<View style={styles.requesterView}>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									fontSize: 20,
									color: colorScheme === "dark" ? palette.white : palette.black,
								}}
							>
								Task Requests
							</Text>
							{data?.requesters?.map(
								(requester: {
									avatar: string;
									id: number;
									name: string;
									college_name: string;
									userid: number;
									status: string;
								}) => (
									<TouchableOpacity
										onPress={() => {
											router.push({
												pathname: "/pages/otherProfile",
												params: {
													UserId: requester?.userid,
												},
											});
										}}
										key={requester.id}
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
											marginVertical: 8,
										}}
									>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "flex-start",
											}}
										>
											<Image
												source={{
													uri:
														requester?.avatar == "default"
															? defaultAvatar
															: data?.avatar,
												}}
												style={{
													width: 30,
													height: 30,
													borderRadius: 15,
													marginLeft: 4,
												}}
											/>
											<Text
												style={{
													fontFamily: "Inter",
													fontSize: 16,
													marginLeft: 12,
												}}
											>
												{requester?.name}
											</Text>
										</View>
										{requester?.status === "pending" ? (
											<View
												style={{
													flexDirection: "row",
													gap: 6,
												}}
											>
												<RPressable
													onPress={async () => {
														try {
															await respondTaskRequest({
																requesterId: requester.userid,
																taskResponse: "reject",
															});
														} catch (err) {
															console.error(err);
														}
													}}
													style={{
														borderWidth: 1,
														borderColor: palette.red,
														borderRadius: 18,
														padding: 4,
														paddingHorizontal: 8,
													}}
												>
													<Text
														style={{
															fontFamily: "Inter",
															fontSize: 12,
															color: palette.red,
															letterSpacing: 0.5,
														}}
													>
														Decline
													</Text>
												</RPressable>
												<RPressable
													onPress={async () => {
														try {
															// await respondTaskRequest({
															// 	requesterId: requester.userid,
															// 	taskResponse: "approve",
															// });
															setCheckout({
																taskId: data?.id,
																workerId: requester.userid,
																title: data?.title,
																price: data?.price,
																category: data?.category,
																created_at: data?.time,
																expiry: data?.expiry,
																worker_name: requester.name,
																worker_avatar: requester.avatar,
																worker_college: requester.college_name,
															});
															router.push({
																pathname: "/pages/CheckOut",
																// params: {
																// 	taskId: data?.id,
																// 	requesterId: requester.userid,
																// },
															});
														} catch (err) {
															console.error(err);
														}
													}}
													style={{
														borderWidth: 1,
														borderColor: palette.success,
														backgroundColor: palette.success,
														borderRadius: 18,
														padding: 4,
														paddingHorizontal: 8,
													}}
												>
													<Text
														style={{
															fontFamily: "Inter",
															fontSize: 12,
															color: palette.black,
															letterSpacing: 0.5,
														}}
													>
														Accept
													</Text>
												</RPressable>
											</View>
										) : requester?.status === "approved" ? (
											<View
												style={{
													borderWidth: 1,
													borderColor: palette.success,
													backgroundColor: palette.success,
													borderRadius: 18,
													padding: 4,
												}}
											>
												<Text
													style={{
														fontFamily: "Inter",
														fontSize: 12,
														color: palette.black,
														letterSpacing: 0.5,
													}}
												>
													Accepted
												</Text>
											</View>
										) : (
											<View
												style={{
													borderWidth: 1,
													borderColor: palette.red,
													backgroundColor: palette.red,
													borderRadius: 18,
													padding: 4,
												}}
											>
												<Text
													style={{
														fontFamily: "Inter",
														fontSize: 12,
														color: palette.black,
														letterSpacing: 0.5,
													}}
												>
													Rejected
												</Text>
											</View>
										)}
									</TouchableOpacity>
								)
							)}
						</View>
					)}
				</ScrollView>
			</View>
			<View
				style={{
					justifyContent: "center",
					width: "100%",
					backgroundColor: "transparent",
				}}
			>
				{taskOwner !== currentUser && !requested && !approved && (
					<Pressable
						onPress={async () => {
							try {
								await addTaskRequest();
							} catch (err) {
								console.error(err);
							}
						}}
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
							Bro, I want to do it
						</Text>
					</Pressable>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	requesterView: {
		margin: 16,
	},
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
		justifyContent: "flex-start",
		padding: 8,
	},
	name: {
		fontSize: 16,
		fontFamily: "InterSemiBold",
		marginLeft: 12,
	},
	btnDelete: {
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default task;
