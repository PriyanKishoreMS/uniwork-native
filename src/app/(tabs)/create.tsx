import {
	StyleSheet,
	TextInput,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import { Pressable, Text, View } from "@/components/Themed";
import { useColorScheme } from "react-native";
import Colors, { palette } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { CategoryMenu } from "@/components/custom/DropDowns";
import * as ImagePicker from "expo-image-picker";
import ImageSlider from "@/components/custom/ImageSlider";

const CreateScreen = () => {
	const colorScheme = useColorScheme();
	var { height } = useWindowDimensions();
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [category, setCategory] = useState("");
	const [images, setImages] = useState<string[]>([]);

	const handleGoBack = () => {
		router.back();
	};

	const pickMultipleImages = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: true,
			quality: 1,
		});
		console.log(result);

		if (!result.canceled) {
			setImages(result.assets.map(image => image.uri));
		}
	};

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
				<ScrollView>
					<View style={styles.container}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: 12,
							}}
						>
							<MaterialIcons
								onPress={handleGoBack}
								name='arrow-back-ios-new'
								size={25}
								color={colorScheme === "dark" ? palette.white : palette.black}
							/>
							<Pressable
								disabled={buttonDisabled}
								style={[
									styles.postButton,
									{
										opacity: buttonDisabled ? 0.5 : 1,
										backgroundColor: buttonDisabled
											? palette.transparent
											: palette.secondary,
										borderWidth: buttonDisabled ? 1 : 0,
										borderColor: buttonDisabled
											? palette.gray
											: palette.transparent,
									},
								]}
							>
								<Text style={styles.postButtonText}>Post</Text>
							</Pressable>
						</View>
						<TextInput
							placeholder='Title'
							multiline={true}
							placeholderTextColor={palette.grayLight2}
							style={[
								styles.textInput,
								{
									color: colorScheme === "dark" ? palette.white : palette.black,
									fontFamily: "InterSemiBold",
									fontSize: 30,
									marginBottom: 12,
								},
							]}
							selectionColor={
								colorScheme === "dark" ? palette.white : palette.black
							}
						/>
						<Pressable
							style={{
								alignItems: "flex-start",
							}}
						>
							<CategoryMenu
								colorScheme={colorScheme}
								category={category}
								setCategory={setCategory}
							/>
						</Pressable>

						<TextInput
							placeholder='What is your task about?'
							multiline={true}
							placeholderTextColor={palette.grayLight2}
							style={[
								styles.textInput,
								{
									color: colorScheme === "dark" ? palette.white : palette.black,
									fontFamily: "Inter",
									fontSize: 18,
								},
							]}
							selectionColor={
								colorScheme === "dark" ? palette.white : palette.black
							}
						/>
					</View>
					{images.length > 0 && (
						<View
							style={{
								marginVertical: 16,
							}}
						>
							<ImageSlider images={images} />
						</View>
					)}
				</ScrollView>
				<View
					style={{
						flexDirection: "row",
						margin: 12,
						justifyContent: "flex-start",
						alignItems: "center",
						gap: 16,
					}}
				>
					<Pressable onPress={pickMultipleImages}>
						<MaterialCommunityIcons
							name='file-image-outline'
							size={30}
							color={colorScheme === "dark" ? palette.white : palette.gray}
							style={styles.filesInput}
						/>
					</Pressable>
					<Pressable>
						<MaterialCommunityIcons
							name='file-plus-outline'
							size={30}
							color={colorScheme === "dark" ? palette.white : palette.gray}
							style={styles.filesInput}
						/>
					</Pressable>
					<Pressable>
						<MaterialCommunityIcons
							name='link-variant-plus'
							size={30}
							color={colorScheme === "dark" ? palette.white : palette.gray}
							style={styles.filesInput}
						/>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16,
	},
	textInput: {
		width: "90%",
		alignItems: "flex-start",
		textAlignVertical: "top",
		maxHeight: 500,
		marginTop: 12,
	},
	postButton: {
		padding: 8,
		paddingHorizontal: 24,
		borderRadius: 12,
	},
	postButtonText: {
		fontFamily: "InterSemiBold",
		fontSize: 18,
	},
	filesInput: {
		padding: 8,
	},
});

export default CreateScreen;
