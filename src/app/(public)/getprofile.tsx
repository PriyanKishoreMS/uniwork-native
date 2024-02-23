import { Text, View, TextInput } from "@/components/Themed";
import { palette } from "@/constants/Colors";
import {
	StyleSheet,
	ScrollView,
	Image,
	ImageSourcePropType,
} from "react-native";
const signinBg: ImageSourcePropType = require("../../../assets/images/signIn/signin2.png");

const GetProfile = () => {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.banner}>
				<Image
					source={signinBg}
					style={{
						width: "100%",
					}}
				/>
				<Text style={styles.bannerText}>
					Welcome to UniWork, Let's get started with your profile
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						lightColor={palette.text}
						darkColor={palette.white}
						bgLight={palette.white}
						borderLight={palette.gray}
						borderDark={palette.white}
						placeholder='Username'
						style={styles.input}
						icon='person'
						//change style on focus
					/>
					<TextInput
						lightColor={palette.text}
						darkColor={palette.white}
						bgLight={palette.white}
						borderLight={palette.gray}
						borderDark={palette.white}
						placeholder='Department'
						style={styles.input}
						icon='school'
					/>
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
	bannerText: {
		padding: 16,
		fontFamily: "InterSemiBold",
		fontSize: 24,
		textAlign: "center",
	},
	inputContainer: {
		padding: 16,
		width: "100%",
	},
	input: {
		borderWidth: 1,
		fontFamily: "Inter",
		borderRadius: 12,
		height: 48,
		paddingHorizontal: 16,
		margin: 16,
		marginTop: 8,
	},
});

export default GetProfile;
