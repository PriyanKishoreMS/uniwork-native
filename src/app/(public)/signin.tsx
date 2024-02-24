import {
	StyleSheet,
	ScrollView,
	Image,
	ImageSourcePropType,
	useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "@/components/Themed";
import { SelectCountry } from "react-native-element-dropdown";
import { colleges } from "../../../colleges";
import { palette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/components/contexts/AuthContext";
import { User } from "@/components/contexts/AuthContext";
const signinBg: ImageSourcePropType = require("../../../assets/images/signIn/signin.png");
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { webClientId } from "../../../.config/firebase.config";

const SignInScreen = () => {
	const colorScheme = useColorScheme();
	const { user, setUser } = useAuth();

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: webClientId,
			offlineAccess: true,
		});
	}, []);

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(
				userInfo.idToken
			);
			await auth().signInWithCredential(googleCredential);
			console.log(userInfo);
		} catch (error) {
			console.log(error);
		} finally {
			router.push("/getprofile");
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.banner}>
				<Image
					source={signinBg}
					style={{
						width: "100%",
					}}
				/>
				<View style={styles.inputContainer}>
					<Text style={styles.para}>
						The most convinient way to get freelance jobs while you're in
						college or university
					</Text>
					<SelectCountry
						data={colleges}
						style={
							colorScheme === "dark"
								? styles.darkDropdown
								: styles.lightDropdown
						}
						placeholderStyle={
							colorScheme === "dark"
								? styles.darkPlaceholder
								: styles.lightPlaceholder
						}
						selectedTextStyle={
							colorScheme === "dark"
								? styles.darkPlaceholder
								: styles.lightPlaceholder
						}
						inputSearchStyle={styles.search}
						containerStyle={
							colorScheme === "dark"
								? styles.dropdownContainerDark
								: styles.dropdownContainerLight
						}
						placeholder='Select your college'
						searchPlaceholder='Type here to search'
						valueField='name'
						activeColor={palette.primaryDark}
						search
						fontFamily='Inter'
						onChange={value => {
							setUser((prev: User | null) => ({
								...(prev as User),
								college: value.name || "",
							}));
						}}
						imageField='image'
						maxHeight={300}
						labelField='name'
						dropdownPosition='auto'
					/>
					<View
						style={{
							margin: 16,
						}}
					>
						<Pressable onPress={signIn} style={styles.googleButton}>
							<AntDesign
								name='google'
								size={21}
								color={palette.white}
								style={{ marginRight: 16 }}
							/>
							<Text
								style={{
									fontSize: 16,
									color: palette.white,
									fontFamily: "Inter",
								}}
							>
								Sign in with Google
							</Text>
						</Pressable>
					</View>
					<Text style={styles.terms}>
						Use your college email to sign in. By signing in, you agree to our
						Terms of Service and Privacy Policy
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		position: "relative",
		textAlign: "center",
		alignItems: "center",
	},
	para: {
		fontSize: 16,
		textAlign: "center",
		fontFamily: "Inter",
	},
	inputContainer: {
		padding: 16,
	},
	dropdownContainerDark: {
		backgroundColor: "#1E1E1E",
		borderRadius: 12,
	},
	dropdownContainerLight: {
		backgroundColor: palette.white,
		borderRadius: 12,
	},
	darkPlaceholder: {
		color: palette.white,
		fontSize: 16,
		fontFamily: "Inter",
	},
	lightPlaceholder: {
		color: palette.text,
		fontSize: 16,
		fontFamily: "Inter",
	},
	search: {
		fontSize: 16,
		fontFamily: "Inter",
		borderRadius: 12,
		backgroundColor: palette.white,
		padding: 5,
	},
	darkDropdown: {
		margin: 16,
		padding: 16,
		marginTop: 32,
		height: 50,
		borderColor: palette.grayLight,
		borderWidth: 1,
		borderRadius: 12,
	},
	lightDropdown: {
		margin: 16,
		padding: 16,
		marginTop: 32,
		height: 50,
		borderColor: palette.gray,
		borderWidth: 1,
		borderRadius: 12,
	},
	googleButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#4285F4",
		padding: 12,
		borderRadius: 12,
	},
	terms: {
		paddingHorizontal: 16,
		fontSize: 13,
		textAlign: "center",
		fontFamily: "Inter",
	},
});

export default SignInScreen;
