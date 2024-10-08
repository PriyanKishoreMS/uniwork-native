import { useAuth } from "@/components/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import { Pressable, Text, View } from "@/components/Themed";
import Colors, { palette } from "@/constants/Colors";
import { fetchUser } from "@/utils/api";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, usePathname } from "expo-router";
import React, { Fragment } from "react";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";

import { useQuery } from "@tanstack/react-query";
import {
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
	useWindowDimensions,
} from "react-native";

const ProfileDetail: React.FC<{
	userId?: number;
}> = ({ userId }) => {
	const colorScheme = useColorScheme();
	const { width } = useWindowDimensions();
	const pathname = usePathname();
	console.log(userId, "userIdNumber in profileDetail");
	const imageWidthHeight = 50;
	const imageBorderRadius = imageWidthHeight / 3;
	const uri = `https://avatars.githubusercontent.com/u/80768547?v=4`;
	const { signOut, isLoading, signedIn, userData } = useAuth();

	const {
		data,
		error,
		isLoading: isLoadingData,
	} = useQuery({
		queryKey: ["user", userId],
		queryFn: async () => {
			return await fetchUser(userData, signOut, userId);
		},
		enabled: !!userData && userId !== undefined,
	});

	const thisUser =
		pathname === "/pages/otherProfile" ? data?.data : userData?.user;
	console.log(data);

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!signedIn) {
		console.log(signedIn, "signedIn status");
		return <Redirect href={"/(public)/signin"} />;
	}
	return (
		<Fragment>
			<SafeAreaView
				style={{
					flex: 0,
					backgroundColor:
						colorScheme === "dark"
							? Colors.dark.background
							: Colors.light.background,
				}}
			>
				<View style={styles.headerContainer}>
					<MaterialIcons
						name='logout'
						size={24}
						color={Colors.dark.background}
						style={{
							padding: 8,
							backgroundColor: palette.yellow,
							borderRadius: 12,
						}}
						onPress={() => {
							signOut();
						}}
					/>
					<Pressable style={styles.editButton}>
						<MaterialIcons
							name='edit'
							size={24}
							color={palette.tertiary}
							style={{
								paddingRight: 4,
							}}
							onPress={() => {
								console.log("Settings icon pressed");
							}}
						/>
						<Text style={styles.para}>Edit</Text>
					</Pressable>
				</View>
			</SafeAreaView>
			<View style={styles.container}>
				<View style={styles.detailContainer}>
					<View>
						<Text style={styles.headerHeading}>{thisUser?.name}</Text>
						<Text
							style={[
								styles.college,
								{
									width: width * 0.8,
								},
							]}
						>
							{thisUser?.college_name}
						</Text>
						<Text
							style={[
								styles.college,
								{
									fontFamily: "InterLight",
									color: palette.grayLight2,
									width: width * 0.8,
								},
							]}
						>
							{thisUser?.dept}
						</Text>
					</View>
					<FastImage
						style={{
							width: imageWidthHeight,
							height: imageWidthHeight,
							borderRadius: imageBorderRadius,
						}}
						source={{
							uri: thisUser?.avatar === "default" ? uri : thisUser?.avatar,
						}}
					/>
				</View>
				<View
					// horizontal
					// showsHorizontalScrollIndicator={false}
					style={{
						justifyContent: "space-between",
						marginVertical: 16,
						flexDirection: "row",
					}}
				>
					<TouchableOpacity
						style={[
							styles.detailElement,
							{
								backgroundColor: palette.gold,
							},
						]}
					>
						<Text style={styles.para}>5</Text>
						<MaterialIcons name='star' size={24} color={palette.white} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.detailElement,
							{
								backgroundColor: palette.primaryDark,
							},
						]}
					>
						<Text style={styles.para}>12</Text>
						<MaterialIcons name='done-all' size={24} color={palette.white} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.detailElement,
							{
								backgroundColor: palette.green,
							},
						]}
					>
						<Text style={styles.para}>1200</Text>
						<MaterialIcons
							name='currency-rupee'
							size={24}
							color={palette.white}
						/>
					</TouchableOpacity>
					{/* <View style={styles.detailElement}>
						<Text style={styles.para}>95</Text>
					</View> */}
				</View>
			</View>
		</Fragment>
	);
};

export default ProfileDetail;

const styles = StyleSheet.create({
	detailElement: {
		backgroundColor: palette.secondary,
		gap: 4,
		alignItems: "center",
		flexDirection: "row",
		marginHorizontal: 8,
		paddingHorizontal: 24,
		borderRadius: 24,
		borderColor: palette.white,
		padding: 8,
	},
	container: {
		justifyContent: "center",
	},
	para: {
		fontSize: 20,
		fontFamily: "InterSemiBold",
	},
	college: {
		fontSize: 15,
		fontFamily: "Inter",
	},
	editButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 6,
		paddingHorizontal: 12,
		borderRadius: 18,
	},
	detailContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 16,
		marginVertical: 8,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 16,
		marginVertical: 8,
	},
	headerHeading: {
		fontSize: 20,
		fontFamily: "InterSemiBold",
	},
});
