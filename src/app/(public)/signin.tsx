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
import { colleges } from "../../../temp/colleges";
import { palette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@/components/contexts/AuthContext";
import { User } from "@/components/contexts/AuthContext";
const signinBg: ImageSourcePropType = require("../../../assets/images/signIn/signin.png");
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { webClientId } from "../../../.config/firebase.config";
import RadioButton from "@/components/custom/RadioButton";

const SignInScreen = () => {
	const colorScheme = useColorScheme();
	const { user, setUser, signIn } = useAuth();
	const [haveAccount, setHaveAccount] = useState(false);

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: webClientId,
			offlineAccess: true,
		});
	}, []);

	return (
		<ScrollView>
			<View style={styles.container}>
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
							itemContainerStyle={{
								paddingLeft: 8,
								borderBottomWidth: 0.5,
								borderBottomColor: palette.gray,
							}}
							itemTextStyle={
								colorScheme === "dark"
									? styles.darkPlaceholder
									: styles.lightPlaceholder
							}
							placeholder='Select your college'
							searchPlaceholder='Type here to search'
							valueField='name'
							imageField='image'
							activeColor={palette.primaryDark}
							disable={haveAccount}
							search
							fontFamily='Inter'
							onChange={value => {
								setUser((prev: User | null) => ({
									...(prev as User),
									college: value.name || "",
								}));
							}}
							maxHeight={300}
							labelField='name'
							dropdownPosition='auto'
						/>
						<RadioButton
							text='Alreay have an account'
							isSelected={haveAccount}
							onPress={() => {
								setHaveAccount(!haveAccount);
							}}
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
		padding: 4,
	},
	dropdownContainerLight: {
		backgroundColor: palette.white,
		borderRadius: 12,
		padding: 4,
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
	},
	darkDropdown: {
		margin: 16,
		paddingHorizontal: 16,
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
