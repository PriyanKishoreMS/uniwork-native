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
	View as DView,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
	useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//testing bro
const checkOutData = {
	taskId: 12,
	userid: 5,
	task_title: "This is the title of the task, that i want to check out",
	task_price: 100,
	username: "Priyan Kishore M S",
	user_avatar: "default",
	user_college: "Hindustan University",
	category: "Document Printing",
	created_at: "2024-05-24T17:20:06Z",
	expiry: "2024-06-25T22:50:05.79169Z",
};

const CheckOutPage = () => {
	const { itemId, requesterId } = useLocalSearchParams();
	const colorScheme = useColorScheme();
	const { height } = useWindowDimensions();
	const router = useRouter();
	const defaultAvatar =
		"https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";

	const handleGoBack = () => {
		router.back();
	};

	console.log("itemId", itemId, requesterId);
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
				<ScrollView style={styles.container}>
					<Pressable style={styles.taskCard}>
						<Text style={styles.cardTitle}>{checkOutData.task_title}</Text>
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
								{checkOutData.category}
							</Text>

							<DView
								style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
							>
								<MaterialIcons
									name='currency-rupee'
									size={21}
									color={convertColorIntensity(palette.green, 20)}
								/>
								<Text style={styles.priceText}>{checkOutData.task_price}</Text>
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
									<Text style={styles.headTitle}>{checkOutData.username}</Text>
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
											checkOutData.user_avatar == "default"
												? defaultAvatar
												: checkOutData.user_avatar,
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
							<Text style={styles.headTitle}>{checkOutData.user_college}</Text>
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
									{formatDateTime(checkOutData.created_at).date}
								</Text>
								<Text style={styles.dateText}>
									{formatDateTime(checkOutData.created_at).time}
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
									{formatDateTime(checkOutData.expiry).date}
								</Text>
								<Text style={styles.dateText}>
									{formatDateTime(checkOutData.expiry).time}
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
								{formatFutureTime(checkOutData.expiry)}
							</Text>
							<Text style={styles.subtitle}> till deadline</Text>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Fragment>
	);
};

const styles = StyleSheet.create({
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
