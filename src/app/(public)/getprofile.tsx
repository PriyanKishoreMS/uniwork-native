import { Text, View, TextInput, Pressable } from "@/components/Themed";
import { palette } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { View as DView } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
	StyleSheet,
	ScrollView,
	Image,
	ImageSourcePropType,
} from "react-native";
import { useState } from "react";
const signinBg: ImageSourcePropType = require("../../../assets/images/signIn/signin2.png");

const GetProfile = () => {
	const [image, setImage] = useState("");

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
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
				<Text style={styles.bannerText}>
					Welcome to UniWork, Let's get started with your profile
				</Text>
				<View style={styles.photoContainer}>
					{image ? (
						<Pressable
							style={{
								borderWidth: 1.2,
								borderColor: palette.grayLight,
								borderStyle: "dashed",
								borderRadius: 12,
							}}
							onPress={pickImage}
						>
							<Image
								source={{ uri: image }}
								style={{
									width: 96,
									height: 96,
									borderRadius: 12,
								}}
							/>
						</Pressable>
					) : (
						<Pressable style={styles.addPhoto} onPress={pickImage}>
							<MaterialIcons
								name='add-a-photo'
								size={24}
								color={palette.grayLight}
							/>
						</Pressable>
					)}
					<View style={styles.paraContainer}>
						<Text style={styles.para}>Add your photo</Text>
						<Text style={styles.sub}>
							Upload a photo of yourself to help people{"\n"}recognize you
						</Text>
					</View>
				</View>
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
					<TextInput
						lightColor={palette.text}
						darkColor={palette.white}
						bgLight={palette.white}
						borderLight={palette.gray}
						borderDark={palette.white}
						placeholder='Mobile Number'
						style={styles.input}
						icon='phone'
						keyboardType='phone-pad'
					/>
					<View
						style={{
							margin: 16,
						}}
					>
						<Pressable
							style={styles.finishButton}
							onPress={() => {
								// router.push("/");
							}}
						>
							<DView
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<MaterialIcons name='done-all' size={24} color={palette.text} />
								<Text style={styles.finishText}>Finish</Text>
							</DView>
						</Pressable>
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
	bannerText: {
		padding: 16,
		fontFamily: "InterSemiBold",
		fontSize: 24,
		textAlign: "center",
	},
	inputContainer: {
		padding: 12,
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
	photoContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		paddingHorizontal: 32,
		width: "100%",
		alignItems: "center",
	},
	addPhoto: {
		borderWidth: 1.2,
		borderColor: palette.grayLight,
		borderStyle: "dashed",
		borderRadius: 12,
		padding: 32,
	},
	paraContainer: {
		marginLeft: 32,
		paddingRight: 64,
	},
	para: {
		fontSize: 16,
		fontFamily: "Inter",
	},
	sub: {
		fontSize: 12,
		textAlign: "left",
		fontFamily: "InterLight",
	},
	finishText: {
		fontSize: 16,
		fontFamily: "InterSemiBold",
		color: palette.text,
		textTransform: "uppercase",
		textAlign: "center",
		marginHorizontal: 8,
	},
	finishButton: {
		backgroundColor: palette.success,
		borderRadius: 12,
		padding: 12,
	},
});

export default GetProfile;
