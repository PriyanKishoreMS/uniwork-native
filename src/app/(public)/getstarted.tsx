import {
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Pressable,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";
import { Image } from "react-native";
import { router } from "expo-router";
import { data } from "../../../services";
import { palette } from "@/constants/Colors";

const getStartedBg = require("../../../assets/images/getStarted/getStarted.png");

const GetStartedScreen = () => {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.banner}>
				<Image source={getStartedBg} />
				<View style={styles.bannerText}>
					<Text style={styles.bannertitle}>
						Find your next {"\n"} freelance job
					</Text>
					<Text style={styles.bannerParagraph}>
						Work done for and done by{"\n"} your fellow students!
					</Text>
				</View>
			</View>
			<View style={styles.introContainer}>
				<Text style={styles.introTitle}>Why UniWork?</Text>
				<Text style={styles.introParagraph}>
					UniWork is the best way to get freelance jobs while you're in college
					or university
				</Text>
				<View style={styles.introBoxes}>
					<ScrollView horizontal={true}>
						<FlatList
							data={data}
							renderItem={({ item }) => (
								<TouchableOpacity style={styles.introBox}>
									<Image
										source={item.image}
										style={{
											width: "100%",
											height: "100%",
											borderRadius: 12,
										}}
									/>
									<View style={styles.introbg}></View>
									<Text style={styles.introBoxText}>{item.key}</Text>
								</TouchableOpacity>
							)}
							numColumns={2}
							keyExtractor={item => item.key}
							contentContainerStyle={styles.introBoxRow}
						/>
					</ScrollView>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.button}
					onPress={() => router.push("/signin")}
					android_ripple={{ color: palette.primaryDark }}
				>
					<Text style={styles.buttonText}>Get Started Bro</Text>
				</Pressable>
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
	bannerParagraph: {
		fontSize: 16,
		textAlign: "center",
		fontFamily: "Inter",
		color: palette.white,
	},
	bannerText: {
		position: "absolute",
		top: "40%",
		backgroundColor: palette.transparent,
	},
	bannertitle: {
		fontSize: 40,
		textAlign: "center",
		color: "white",
		fontFamily: "InterSemiBold",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		backgroundColor: palette.primary,
		padding: 5,
		height: 40,
		borderRadius: 12,
		width: "90%",
	},
	buttonText: {
		fontSize: 15,
		fontFamily: "InterSemiBold",
		color: palette.text,
	},
	buttonContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 50,
	},
	introContainer: {
		marginTop: 40,
		paddingHorizontal: 16,
	},
	introTitle: {
		fontSize: 30,
		fontFamily: "InterSemiBold",
	},
	introParagraph: {
		paddingTop: 16,
		fontSize: 15,
		fontFamily: "InterLight",
	},
	introBoxes: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 20,
	},
	introBox: {
		width: 170,
		height: 170,
		margin: 6,
		aspectRatio: 1,
		borderColor: palette.gray,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "flex-start",
	},
	introbg: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.2)",
		borderRadius: 12,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	introBoxRow: {
		flexDirection: "column",
		justifyContent: "center",
	},
	introBoxText: {
		position: "absolute",
		bottom: 0,
		left: 0,
		fontSize: 15,
		fontFamily: "Inter",
		color: palette.white,
		padding: 10,
	},
});

export default GetStartedScreen;
