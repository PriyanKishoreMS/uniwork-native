import {
	StyleSheet,
	TextInput,
	useWindowDimensions,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { Pressable, Text, View } from "@/components/Themed";
import { useColorScheme } from "react-native";
import Colors, { palette } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { CategoryMenu } from "@/components/custom/DropDowns";
import ImageSlider from "@/components/custom/ImageSlider";
import {
	pickMultipleImages,
	pickMultipleFiles,
	convertColorIntensity,
} from "@/utils";
import { DocumentPickerResult } from "expo-document-picker";
import { Dropdown } from "react-native-element-dropdown";
import {
	ScopeOption,
	PostPageLoadingStates as loadingStates,
	FormData as FormDataType,
} from "@/types";
import DateTimePicker from "@/components/DateTimePicker";
import { useAuth } from "@/components/contexts/AuthContext";
import { Redirect } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ipAddrPort } from "../../../temp/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateScreen = () => {
	const colorScheme = useColorScheme();
	var { height } = useWindowDimensions();
	const { signedIn, isLoading } = useAuth();
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [category, setCategory] = useState("");
	const [images, setImages] = useState<string[]>([]);
	const [files, setFiles] = useState<DocumentPickerResult["assets"]>(null);
	const [scope, setScope] = useState<ScopeOption>({
		label: "College",
		value: "college",
	});
	const [loading, setLoading] = useState<loadingStates>({
		images: null,
		files: null,
	});
	const [data, setData] = useState<FormDataType>({
		title: "",
		description: "",
		price: 0,
		category: "",
		expiry: "",
		scope: null,
		images: null,
		files: null,
	});

	const postData = async () => {
		try {
			const formdata = new FormData();
			formdata.append("title", data.title);
			formdata.append("description", data.description);
			formdata.append("price", data.price.toString());
			formdata.append("category", data.category);
			formdata.append("expiry", data.expiry);
			console.log(data.expiry, "expiry data\n");
			formdata.append("status", "open");

			if (data.images) {
				for (const asset of data.images) {
					formdata.append("images", {
						uri: asset.uri,
						name: asset.fileName,
						type: asset.mimeType,
					} as any);
				}
			}
			if (data.files) {
				for (const asset of data.files) {
					formdata.append("files", {
						uri: asset.uri,
						name: asset.name,
						type: asset.mimeType,
					} as any);
				}
			}
			const imagesValues = formdata.getAll("images");
			console.log(imagesValues, "\n\nformdata images\n");

			const accessToken = await AsyncStorage.getItem("accessToken");
			const response = await fetch(`${ipAddrPort}/task`, {
				method: "POST",
				headers: {
					"content-type": "multipart/form-data",
					Accept: "multipart/form-data",
					Authorization: `Bearer ${accessToken}`,
				},
				body: formdata,
			});

			const res = await response.json();
			console.log(res, "response");
			return res;
		} catch (error) {
			console.error(error, "error here");
		}
	};

	const queryClient = useQueryClient();
	const { mutateAsync: addTaskMutation } = useMutation({
		mutationFn: postData,
		onSuccess: () => {
			console.log("Task added");
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	const handleButtonDisabled = () => {
		if (
			data.title &&
			data.description &&
			data.price &&
			data.category &&
			data.scope
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	};

	useEffect(() => {
		handleButtonDisabled();
	}, [data]);

	const handleImages = async () => {
		try {
			setLoading({
				...loading,
				images: true,
			});
			const result = await pickMultipleImages();
			if (!result.canceled) {
				setImages(result.assets.map(file => file.uri));
				setData({
					...data,
					images: result.assets,
				});
			}
			console.log(loading.images, "loading");
			console.log(images);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading({
				...loading,
				images: false,
			});
		}
	};

	const handleFiles = async () => {
		try {
			setLoading({
				...loading,
				files: true,
			});
			const result = await pickMultipleFiles();
			if (!result.canceled) {
				setFiles(result.assets);
				setData({
					...data,
					files: result.assets,
				});
			}
			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading({
				...loading,
				files: false,
			});
		}
	};

	const handleGoBack = () => {
		router.back();
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!signedIn) {
		console.log(signedIn, "signedIn status");
		return <Redirect href={"/(public)/signin"} />;
	}

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
						onPress={async () => {
							try {
								await addTaskMutation();
							} catch (error) {
								console.log(error);
							}
							// router.push("/(tabs)/");
						}}
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
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "space-between",
					}}
				>
					<View>
						<View style={styles.container}>
							<TextInput
								placeholder='Title'
								onChangeText={text => {
									setData({
										...data,
										title: text,
									});
								}}
								multiline={true}
								placeholderTextColor={palette.grayLight2}
								style={[
									styles.textInput,
									{
										color:
											colorScheme === "dark" ? palette.white : palette.black,
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
										setData={setData}
										data={data}
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
										color={convertColorIntensity(palette.green, 20)}
									/>
									<TextInput
										placeholder='Put a price'
										onChangeText={text => {
											setData({
												...data,
												price: parseInt(text),
											});
										}}
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
								onChangeText={text => {
									setData({
										...data,
										description: text,
									});
								}}
								multiline={true}
								placeholderTextColor={palette.grayLight2}
								style={[
									styles.textInput,
									{
										color:
											colorScheme === "dark" ? palette.white : palette.black,
										fontFamily: "Inter",
										fontSize: 18,
									},
								]}
								selectionColor={
									colorScheme === "dark" ? palette.white : palette.black
								}
							/>
						</View>
						{loading.images === true ? (
							<View style={styles.loader}>
								<ActivityIndicator size='large' color={palette.primary} />
								<Text style={styles.loadingText}>Loading Images</Text>
							</View>
						) : (
							images.length > 0 && (
								<View
									style={{
										marginVertical: 16,
									}}
								>
									<ImageSlider images={images} />
								</View>
							)
						)}
						{loading.files === true ? (
							<View style={styles.loader}>
								<ActivityIndicator size='large' color={palette.primary} />
								<Text style={styles.loadingText}>Loading Files</Text>
							</View>
						) : (
							files && (
								<View
									style={{
										margin: 16,
									}}
								>
									<Text
										style={{
											fontFamily: "InterSemiBold",
											fontSize: 20,
											color:
												colorScheme === "dark" ? palette.white : palette.black,
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
														colorScheme === "dark"
															? palette.white
															: palette.black
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
							)
						)}
					</View>
					<View>
						<DateTimePicker
							colorScheme={colorScheme}
							setData={setData}
							data={data}
						/>
					</View>
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
						value={scope}
						onChange={value => {
							console.log(value);
							setScope(value);
							setData({
								...data,
								scope: value,
							});
						}}
						labelField={"label"}
						placeholder='Scope'
						dropdownPosition='top'
						activeColor={palette.primaryDark}
						renderLeftIcon={() => {
							return scope && scope.value === "college" ? (
								<MaterialCommunityIcons
									name='school'
									size={24}
									color={palette.primaryDark}
									style={{
										marginRight: 8,
									}}
								/>
							) : (
								<MaterialCommunityIcons
									name='earth'
									size={18}
									color={palette.primaryDark}
									style={{
										marginRight: 8,
									}}
								/>
							);
						}}
						renderRightIcon={() => {
							return (
								<MaterialCommunityIcons
									name='chevron-up'
									size={24}
									color={palette.gray}
								/>
							);
						}}
						placeholderStyle={{
							color: colorScheme === "dark" ? palette.grayLight : palette.gray,
							fontSize: 16,
							fontFamily: "Inter",
						}}
						containerStyle={{
							borderRadius: 12,
							marginBottom: 56,
							borderWidth: 0,
							// paddingHorizontal: 8,
							backgroundColor:
								colorScheme === "dark" ? palette.grayDark : palette.grayLight2,
						}}
						itemTextStyle={{
							color: colorScheme === "dark" ? palette.white : palette.black,
							fontFamily: "Inter",
							fontSize: 16,
						}}
						selectedTextStyle={{
							color: colorScheme === "dark" ? palette.white : palette.black,
							fontFamily: "InterSemiBold",
							fontSize: 16,
						}}
						itemContainerStyle={{
							borderRadius: 12,
						}}
						style={{
							width: "40%",
							marginLeft: 12,
							borderWidth: 1,
							borderColor: palette.gray,
							borderRadius: 12,
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
	loader: {
		flex: 1,
		marginTop: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginLeft: 12,
		fontFamily: "InterLight",
		fontSize: 18,
	},
});

export default CreateScreen;
