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
import ImageSlider from "@/components/custom/ImageSlider";
import { pickMultipleImages, pickMultipleFiles, DarkenColor } from "@/utils";
import { DocumentPickerResult } from "expo-document-picker";
import { Dropdown } from "react-native-element-dropdown";

const CreateScreen = () => {
	const colorScheme = useColorScheme();
	var { height } = useWindowDimensions();
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [category, setCategory] = useState("");
	const [images, setImages] = useState<string[]>([]);
	const [files, setFiles] = useState<DocumentPickerResult["assets"]>(null);

	const handleImages = async () => {
		const result = await pickMultipleImages();
		if (!result.canceled) {
			setImages(result.assets.map(file => file.uri));
		}

		console.log(images);
	};

	const handleFiles = async () => {
		const result = await pickMultipleFiles();
		if (!result.canceled) {
			setFiles(result.assets);
		}
		console.log(result);
	};

	const handleGoBack = () => {
		router.back();
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
				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 16,
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
				<ScrollView>
					<View style={styles.container}>
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
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Pressable>
								<CategoryMenu
									colorScheme={colorScheme}
									category={category}
									setCategory={setCategory}
								/>
							</Pressable>
							<View
								style={[
									styles.priceView,
									{
										backgroundColor:
											colorScheme === "dark"
												? palette.grayDark
												: palette.transparent,
									},
								]}
							>
								<MaterialIcons
									name='currency-rupee'
									size={20}
									color={DarkenColor(palette.green, 20)}
								/>
								<TextInput
									placeholder='Put a price'
									keyboardType='numeric'
									maxLength={7}
									placeholderTextColor={palette.grayLight2}
									selectionColor={
										colorScheme === "dark" ? palette.white : palette.black
									}
									style={{
										color:
											colorScheme === "dark" ? palette.white : palette.black,
										fontFamily: "Inter",
										padding: 2,
										borderColor: palette.green,
										fontSize: 16,
									}}
								/>
							</View>
						</View>

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
					{files && (
						<View
							style={{
								margin: 16,
							}}
						>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									fontSize: 20,
									color: colorScheme === "dark" ? palette.white : palette.black,
								}}
							>
								Files
							</Text>
							<View style={styles.filesContainer}>
								{files.map((file, index) => (
									<View
										key={index}
										style={[
											styles.filesBox,
											{
												backgroundColor:
													colorScheme === "dark"
														? palette.grayDark
														: palette.grayLight2,
											},
										]}
									>
										<MaterialCommunityIcons
											name='file-document-outline'
											size={24}
											color={
												colorScheme === "dark" ? palette.white : palette.black
											}
											style={{
												marginRight: 4,
											}}
										/>
										<Text
											style={{
												fontFamily: "Inter",
												fontSize: 16,
												color:
													colorScheme === "dark"
														? palette.white
														: palette.black,
											}}
										>
											{file.name}
										</Text>
									</View>
								))}
							</View>
						</View>
					)}
				</ScrollView>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginHorizontal: 16,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							marginVertical: 6,
							justifyContent: "flex-start",
							alignItems: "center",
							gap: 16,
						}}
					>
						<Pressable onPress={handleImages}>
							<MaterialCommunityIcons
								name='file-image-outline'
								size={30}
								color={colorScheme === "dark" ? palette.white : palette.gray}
								style={styles.filesInput}
							/>
						</Pressable>
						<Pressable onPress={handleFiles}>
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
					<Dropdown
						data={[
							{
								label: "College",
								value: "college",
							},
							{
								label: "Public",
								value: "public",
							},
						]}
						valueField={"value"}
						onChange={value => console.log(value)}
						labelField={"label"}
						placeholder='Scope'
						dropdownPosition='top'
						placeholderStyle={{
							color: colorScheme === "dark" ? palette.grayLight : palette.gray,
							fontSize: 16,
							fontFamily: "Inter",
						}}
						containerStyle={{
							borderWidth: 1,
							borderColor: palette.gray,
						}}
						style={{
							width: "40%",
							marginLeft: 12,
							borderWidth: 1,
							borderColor: palette.gray,
							borderRadius: 12,
							padding: 2,
							paddingHorizontal: 12,
						}}
					/>
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
	filesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 12,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 12,
	},
	filesBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		borderRadius: 12,
	},
	priceView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		paddingHorizontal: 12,
		borderColor: palette.green,
		borderRadius: 20,
	},
});

export default CreateScreen;
