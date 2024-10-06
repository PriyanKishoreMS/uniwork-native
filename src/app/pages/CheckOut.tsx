import { razorpayKey } from "@/../.config/razorpay.config";
import { useAuth } from "@/components/contexts/AuthContext";
import { Pressable, Text, View } from "@/components/Themed";
import Colors, { palette } from "@/constants/Colors";
import {
	convertColorIntensity,
	formatDateTime,
	formatFutureTime,
} from "@/utils";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fragment } from "react";
import {
	Pressable as DPressable,
	View as DView,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
	useWindowDimensions,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckOutPage = () => {
	const { taskId, requesterId } = useLocalSearchParams();
	const colorScheme = useColorScheme();
	const { height } = useWindowDimensions();
	const router = useRouter();
	const { checkout } = useAuth();
	const defaultAvatar =
		"https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";

	const handleGoBack = () => {
		router.back();
	};
	console.log(taskId, requesterId, "params");

	// console.log("\n\n\ncheckout", checkout);

	// const {
	// 	data: checkOutData,
	// 	error,
	// 	isLoading: isLoadingData,
	// } = useQuery({
	// 	queryKey: ["checkout", taskId],
	// 	queryFn: async () => {
	// 		return await FetchCheckoutTaskRequest(
	// 			taskId as string,
	// 			requesterId as string,
	// 			userData?.accessToken as string
	// 		);
	// 	},
	// });

	const startPayment = async () => {
		var options = {
			description: "Create order",
			image: "https://i.imgur.com/3g7nmJC.jpg",
			currency: "INR",
			key: razorpayKey,
			amount: 50000,
			name: "uniwork",
			order_id: "",
			prefill: {
				email: "postcardbox20@gmail.com",
				name: "Priyan Kishore",
			},
			theme: { color: palette.primary },
		};
		RazorpayCheckout.open(options)
			.then(data => {
				alert(`Success: ${data.razorpay_payment_id}`);
				console.log(data, "razorpay success data");
			})
			.catch(error => {
				alert(`Error: ${error.code} | ${error.description}`);
			});
	};

	return (
		<Fragment>
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
				<View style={styles.headerContainer}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 12,
						}}
					>
						<MaterialIcons
							onPress={handleGoBack}
							name='arrow-back-ios-new'
							size={24}
							color={colorScheme === "dark" ? palette.white : palette.black}
						/>
						<Text style={styles.headTitle}>Checkout</Text>
					</View>
					<Pressable style={styles.cancelBtn}>
						<Text
							style={{
								color: palette.red,
								fontSize: 16,
								fontFamily: "Inter",
							}}
						>
							Cancel
						</Text>
					</Pressable>
				</View>
				{checkout && (
					<ScrollView style={styles.container}>
						<Pressable style={styles.taskCard}>
							<Text style={styles.cardTitle}>{checkout?.title}</Text>
							<DView
								style={[
									styles.toSide,
									{
										marginTop: 8,
									},
								]}
							>
								<Text
									style={[
										styles.subtitle,
										{
											color:
												colorScheme === "dark"
													? palette.grayLight2
													: palette.gray,
										},
									]}
								>
									{checkout?.category}
								</Text>

								<DView
									style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
								>
									<MaterialIcons
										name='currency-rupee'
										size={21}
										color={convertColorIntensity(palette.green, 20)}
									/>
									<Text style={styles.priceText}>{checkout?.price}</Text>
								</DView>
							</DView>
							<TouchableOpacity>
								<Text
									style={{
										color: palette.blue,
										fontSize: 16,
										fontFamily: "Inter",
									}}
								>
									Change
								</Text>
							</TouchableOpacity>
						</Pressable>
						<View style={styles.detailView}>
							<View style={{ marginVertical: 8 }}>
								<View style={styles.toSide}>
									<View>
										<Text style={styles.headTitle}>
											{checkout?.worker_name}
										</Text>
										<Text
											style={[
												styles.subtitle,
												{
													color:
														colorScheme === "dark"
															? palette.grayLight2
															: palette.gray,
												},
											]}
										>
											Worker Name
										</Text>
									</View>
									<Image
										source={{
											uri:
												checkout?.worker_avatar == "default"
													? defaultAvatar
													: checkout?.worker_avatar,
										}}
										style={{
											width: 60,
											height: 60,
											borderRadius: 30,
											marginLeft: 4,
										}}
									/>
								</View>
							</View>
							<View style={{ marginVertical: 8 }}>
								<Text style={styles.headTitle}>{checkout?.worker_college}</Text>
								<Text
									style={[
										styles.subtitle,
										{
											color:
												colorScheme === "dark"
													? palette.grayLight2
													: palette.gray,
										},
									]}
								>
									Institute
								</Text>
							</View>
							<View
								style={{
									marginVertical: 8,
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<Text style={styles.dateText}>
										{formatDateTime(checkout?.created_at).date}
									</Text>
									<Text style={styles.dateText}>
										{formatDateTime(checkout?.created_at).time}
									</Text>
									<Text
										style={[
											styles.subtitle,
											{
												color:
													colorScheme === "dark"
														? palette.grayLight2
														: palette.gray,
											},
										]}
									>
										Created At
									</Text>
								</View>
								<Octicons
									name='dash'
									size={24}
									color={palette.white}
									style={{ marginVertical: 8 }}
								/>
								<View style={{ alignItems: "flex-end" }}>
									<Text style={styles.dateText}>
										{formatDateTime(checkout?.expiry).date}
									</Text>
									<Text style={styles.dateText}>
										{formatDateTime(checkout?.expiry).time}
									</Text>
									<Text
										style={[
											styles.subtitle,
											{
												color:
													colorScheme === "dark"
														? palette.grayLight2
														: palette.gray,
											},
										]}
									>
										Deadline
									</Text>
								</View>
							</View>
							<View
								style={{
									marginVertical: 8,
									alignItems: "center",
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<Text
									style={[
										styles.subtitle,
										{
											color: palette.red,
											fontFamily: "InterBold",
										},
									]}
								>
									{formatFutureTime(checkout?.expiry)}
								</Text>
								<Text style={styles.subtitle}> till deadline</Text>
							</View>
						</View>
					</ScrollView>
				)}
				<DPressable
					onPress={startPayment}
					android_ripple={{
						color: "rgba(0, 0, 0, 0.32)",
					}}
					style={styles.payBtn}
				>
					<Text style={styles.cardTitle}>Pay</Text>
				</DPressable>
			</SafeAreaView>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	payBtn: {
		backgroundColor: palette.blue,
		padding: 12,
		alignItems: "center",
	},
	toSide: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	detailView: {
		margin: 16,
	},
	priceText: {
		fontSize: 21,
		fontFamily: "InterBold",
	},
	taskCard: {
		borderWidth: 1,
		borderColor: palette.gray,
		padding: 16,
		borderRadius: 8,
		marginVertical: 8,
	},
	cancelBtn: {
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	container: {
		flex: 1,
		marginHorizontal: 16,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 16,
		marginVertical: 8,
	},
	dateText: {
		fontSize: 20,
		fontFamily: "Inter",
	},
	headTitle: {
		fontSize: 20,
		fontFamily: "Inter",
	},
	cardTitle: {
		fontSize: 20,
		fontFamily: "InterSemiBold",
		includeFontPadding: false,
	},
	subtitle: {
		fontSize: 16,
		fontFamily: "InterLight",
	},
});

export default CheckOutPage;
