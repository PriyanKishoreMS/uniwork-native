import {
	ScrollView,
	Pressable,
	StyleSheet,
	TouchableWithoutFeedback,
	useColorScheme,
	useWindowDimensions,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors, { palette } from "@/constants/Colors";
import { Fragment, useState } from "react";
import { convertColorIntensity, getRandomColor } from "@/utils";
import FastImage from "react-native-fast-image";
import { MaterialIcons } from "@expo/vector-icons";
import StarRating from "@/components/custom/StarRating";
import { useAuth } from "@/components/contexts/AuthContext";
import { Redirect } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import Collapsible from "react-native-collapsible";

const ProfileScreen = () => {
	const colorScheme = useColorScheme();
	const { height } = useWindowDimensions();
	const [bannerColor, setBannerColor] = useState(getRandomColor());
	const [collapseDetails, setCollapseDetails] = useState(true);

	const bannerHeight = height / 8;
	const imageWidthHeight = 110;
	const imageBorderRadius = imageWidthHeight / 2;
	const uri = `https://xsgames.co/randomusers/assets/avatars/female/9.jpg`;
	const { signOut, isLoading, signedIn, userData } = useAuth();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!signedIn) {
		console.log(signedIn, "signedIn status");
		return <Redirect href={"/(public)/signin"} />;
	}
	return (
		<Fragment>
			<SafeAreaView style={{ flex: 0, backgroundColor: bannerColor }} />
			<ScrollView
				style={{
					backgroundColor:
						colorScheme === "dark"
							? Colors.dark.background
							: Colors.light.background,
					flex: 1,
				}}
			>
				<View style={styles.container}>
					<TouchableWithoutFeedback
						onPress={() => {
							setBannerColor(getRandomColor());
						}}
					>
						<View
							style={[
								styles.bannerContainer,
								{
									height: bannerHeight,
									width: "100%",
									backgroundColor: bannerColor,
								},
							]}
						>
							<MaterialIcons
								name='edit'
								size={24}
								color={Colors.dark.background}
								style={{
									margin: 16,
									padding: 8,
									backgroundColor: convertColorIntensity(bannerColor, -20),
									borderRadius: 12,
								}}
								onPress={() => {
									console.log("Settings icon pressed");
								}}
							/>
							<MaterialIcons
								name='settings'
								size={24}
								color={Colors.dark.background}
								style={{
									margin: 16,
									padding: 8,
									backgroundColor: convertColorIntensity(bannerColor, -20),
									borderRadius: 12,
								}}
								onPress={() => {
									console.log("Settings icon pressed");
								}}
							/>
						</View>
					</TouchableWithoutFeedback>
					<View style={styles.imageView}>
						<FastImage
							source={{
								uri:
									userData?.user?.avatar === "default"
										? uri
										: userData?.user?.avatar,
							}}
							style={{
								width: imageWidthHeight,
								height: imageWidthHeight,
								borderColor:
									colorScheme === "dark"
										? Colors.dark.background
										: Colors.light.background,
								borderWidth: 6,
								borderRadius: imageBorderRadius,
								marginTop: -imageWidthHeight / 2,
							}}
						/>
					</View>
					<View
						style={{
							alignItems: "center",
						}}
					>
						<Text style={styles.nameText}>{userData?.user.name}</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<StarRating rating={4.5} color={bannerColor} size={15} />
							<Text
								style={[
									styles.detailText,
									{
										marginLeft: 8,
									},
								]}
							>
								(22)
							</Text>
						</View>
						<Text style={styles.collegeText}>
							Hindustan Institute of Technology and Science
						</Text>
					</View>
					<View
						style={{
							borderWidth: 0.5,
							borderColor:
								colorScheme === "dark" ? palette.white : palette.gray,
							marginVertical: 16,
						}}
					/>
					<Pressable
						onPress={() => {
							setCollapseDetails(!collapseDetails);
						}}
						style={{
							marginHorizontal: 16,
							marginBottom: 16,
						}}
					>
						<View
							style={{
								justifyContent: "space-between",
								flexDirection: "row",
							}}
						>
							<Text style={styles.openTaskHeading}>View Details</Text>
							<MaterialIcons
								name={collapseDetails ? "arrow-drop-down" : "arrow-drop-up"}
								size={24}
								color={palette.white}
							/>
						</View>
					</Pressable>
					<Collapsible collapsed={collapseDetails} style={styles.details}>
						<View style={styles.detailRow}>
							<Text
								style={[
									styles.detailText,
									{
										color:
											colorScheme === "dark"
												? palette.grayLight2
												: palette.gray,
									},
								]}
							>
								Department
							</Text>
							<Text style={styles.detailText}>{userData?.user?.dept}</Text>
						</View>
						<View style={styles.detailRow}>
							<Text
								style={[
									styles.detailText,
									{
										color:
											colorScheme === "dark"
												? palette.grayLight2
												: palette.gray,
									},
								]}
							>
								Mail
							</Text>
							<View
								style={{
									width: "70%",
								}}
							>
								<Text style={styles.detailText}>{userData?.user.email}</Text>
							</View>
						</View>
						<View style={styles.detailRow}>
							<Text
								style={[
									styles.detailText,
									{
										color:
											colorScheme === "dark"
												? palette.grayLight2
												: palette.gray,
									},
								]}
							>
								Total Tasks
							</Text>
							<Text style={styles.detailText}>100</Text>
						</View>
					</Collapsible>

					<View style={styles.openTaskView}>
						<Text style={styles.openTaskHeading}>Open Tasks</Text>
					</View>
				</View>
			</ScrollView>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	openTaskHeading: {
		fontSize: 20,
		fontFamily: "InterSemiBold",
	},
	openTaskView: {
		marginTop: 16,
		marginHorizontal: 24,
	},
	container: {
		flex: 1,
		justifyContent: "center",
	},
	bannerContainer: {
		position: "relative",
		textAlign: "center",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	imageView: {
		zIndex: 1,
		alignItems: "center",
	},
	nameText: {
		fontSize: 24,
		fontFamily: "InterSemiBold",
		textAlign: "center",
		marginTop: 8,
	},
	collegeText: {
		fontFamily: "Inter",
		fontSize: 15,
		width: "80%",
		textAlign: "center",
	},
	details: {
		marginHorizontal: 24,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	detailText: {
		fontFamily: "Inter",
		fontSize: 16,
		textAlign: "right",
	},
	logoutButton: {
		backgroundColor: palette.red,
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	logoutFont: {
		fontFamily: "InterSemiBold",
		fontSize: 16,
		color: palette.white,
	},
});

export default ProfileScreen;
