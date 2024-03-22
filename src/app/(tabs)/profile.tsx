import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	useColorScheme,
	useWindowDimensions,
} from "react-native";

import { Text, View, Pressable } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors, { palette } from "@/constants/Colors";
import { Fragment, useState } from "react";
import { convertColorIntensity, getRandomColor } from "@/utils";
import FastImage from "react-native-fast-image";
import { MaterialIcons } from "@expo/vector-icons";
import StarRating from "@/components/custom/StarRating";
import { useAuth } from "@/components/contexts/AuthContext";

const ProfileScreen = () => {
	const colorScheme = useColorScheme();
	const { height } = useWindowDimensions();
	const [bannerColor, setBannerColor] = useState(getRandomColor());

	const bannerHeight = height / 8;
	const imageWidthHeight = 110;
	const imageBorderRadius = imageWidthHeight / 2;
	const uri = `https://xsgames.co/randomusers/assets/avatars/female/9.jpg`;
	const { signOut } = useAuth();

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
						</View>
					</TouchableWithoutFeedback>
					<View style={styles.imageView}>
						<FastImage
							source={{
								uri: uri,
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
						<Text style={styles.nameText}>Margaret Miaz</Text>
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
					<View style={styles.details}>
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
							<Text style={styles.detailText}>CSE</Text>
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
								<Text style={styles.detailText}>
									20113022@student.hindustanuniv.ac.in
								</Text>
							</View>
						</View>
						<Pressable
							onPress={async () => {
								await signOut();
							}}
							style={{
								width: "100%",
								backgroundColor: "red",
								height: 50,
							}}
						>
							<Text>Logout</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	bannerContainer: {
		position: "relative",
		textAlign: "center",
		alignItems: "flex-end",
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
});

export default ProfileScreen;
