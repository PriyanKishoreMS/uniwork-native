import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Text, View, Pressable } from "@/components/Themed";
import Colors, { palette } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { leaderBoard } from "../../../temp/users";
import { Fragment } from "react";
import FastImage from "react-native-fast-image";
import { useAuth } from "@/components/contexts/AuthContext";
import { Redirect } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

const PeopleScreen = () => {
	const { signedIn, isLoading } = useAuth();
	const colorScheme = useColorScheme();
	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!signedIn) {
		console.log(signedIn, "signedIn status");
		return <Redirect href={"/(public)/signin"} />;
	}
	return (
		<Fragment>
			{/* <SafeAreaView
				style={{ flex: 0, backgroundColor: Colors.dark.tabBackground }}
			/> */}
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor:
						colorScheme === "dark"
							? Colors.dark.background
							: Colors.light.background,
				}}
			>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>Leaderboard</Text>
					<View>
						<MaterialIcons
							name='search'
							size={32}
							color={palette.white}
							style={{
								marginRight: 16,
							}}
						/>
					</View>
				</View>
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.container}>
						<Text style={styles.top3Text}>Top 3 Taskers of the Week</Text>
						<View
							style={{
								borderColor: "white",
								borderWidth: 1,
								marginVertical: 8,
							}}
						/>
						{leaderBoard.weeklyTop3.map((user, index) => (
							<View key={index} style={styles.userRow}>
								<Text style={styles.textFont}>{user.name}</Text>
								<Text style={styles.textFont}>{user.score}</Text>
							</View>
						))}
					</View>
					<View style={styles.container}>
						<Text style={styles.top3Text}>Top 10 Taskers of the Month</Text>
						<View
							style={{
								borderColor: "white",
								borderWidth: 1,
								marginVertical: 8,
							}}
						/>
						{leaderBoard.monthlyTop10.map((user, index) => (
							<View key={index} style={styles.userRow}>
								<Text style={[styles.textFont]}>{index + 1}</Text>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										width: "80%",
									}}
								>
									<FastImage
										style={{ width: 32, height: 32, borderRadius: 16 }}
										source={{ uri: user.avatar + `&n=${Math.random() * 78}` }}
									/>
									<Text style={[styles.textFont]}>{user.name}</Text>
								</View>
								<Text style={[styles.textFont]}>{user.score}</Text>
							</View>
						))}
					</View>
				</ScrollView>
			</SafeAreaView>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		margin: 16,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.dark.background,
	},
	headerText: {
		fontSize: 20,
		fontFamily: "InterSemiBold",
		margin: 16,
	},
	top3Text: {
		fontSize: 24,
		fontFamily: "InterSemiBold",
	},
	userRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		margin: 8,
	},
	textFont: {
		fontSize: 16,
		fontFamily: "Inter",
	},
});

export default PeopleScreen;
