import {
	StyleSheet,
	FlatList,
	useColorScheme,
	View as DefaultView,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskCategories } from "@/types";
import Colors, { palette } from "@/constants/Colors";
import { Pressable, Text, View } from "@/components/Themed";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { Redirect } from "expo-router";
import { useAuth } from "@/components/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import { useInfiniteQuery } from "@tanstack/react-query";
import SomethingWrong from "@/components/SomethingWrong";
import NothingToSee from "@/components/NothingToSee";
import { fetchTasks } from "@/utils/api";
import Task from "@/app/pages/Task";
import Collapsible from "react-native-collapsible";

const TasksScreen = () => {
	const colorScheme = useColorScheme();
	const [scope, setScope] = useState<"college" | "Public">("college");
	const { signedIn, signOut, isLoading, userData } = useAuth();
	const [category, setCategory] = useState("All");

	const {
		data: task,
		error: taskError,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
		isLoading: isLoadingTasks,
	} = useInfiniteQuery({
		queryKey: ["tasks", category],
		queryFn: async ({ pageParam = 1 }) => {
			return await fetchTasks(pageParam, userData, signOut, category);
		},
		initialPageParam: 1,
		enabled: !!userData,
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length === 0) return undefined;
			return pages.length + 1;
		},
	});

	const onEndReachedFunc = () => {
		if (hasNextPage && !isLoadingTasks) {
			fetchNextPage();
		}
	};

	const flatData = task?.pages.flatMap(page => page.data);
	const [isDisplayCategory, setIsDisplayCategory] = useState(false);
	const [isDisplayScope, setIsDisplayScope] = useState(false);

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (taskError) {
		return <SomethingWrong />;
	}

	if (!signedIn) {
		console.log(signedIn, "signedIn status");
		return <Redirect href={"/(public)/signin"} />;
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor:
					colorScheme === "dark"
						? Colors.dark.background
						: Colors.light.background,
			}}
		>
			<View
				style={{
					backgroundColor:
						colorScheme === "dark"
							? Colors.dark.background
							: Colors.light.background,
				}}
			>
				<DefaultView
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginHorizontal: 16,
						marginBottom: 8,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							// borderWidth: 1,
							borderRadius: 12,
							borderColor: palette.primary,
						}}
					>
						<Pressable
							style={{
								padding: 4,
								flexDirection: "row",
								alignItems: "center",
							}}
							onPress={() => {
								setIsDisplayScope(!isDisplayScope);
							}}
						>
							{scope === "Public" ? (
								<MaterialCommunityIcons
									name='earth'
									size={18}
									color={palette.primary}
									marginLeft={4}
								/>
							) : (
								<MaterialCommunityIcons
									name='school'
									size={18}
									color={palette.primary}
									marginLeft={4}
								/>
							)}
							<Text
								style={{
									fontSize: 18,
									paddingHorizontal: 8,
									fontFamily: "InterBold",
									textTransform: "capitalize",
								}}
							>
								{scope}
							</Text>
							{isDisplayScope ? (
								<MaterialCommunityIcons
									name='chevron-up'
									size={24}
									color={colorScheme === "dark" ? palette.white : palette.black}
								/>
							) : (
								<MaterialCommunityIcons
									name='chevron-down'
									size={24}
									color={colorScheme === "dark" ? palette.white : palette.black}
								/>
							)}
						</Pressable>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 8,
						}}
					>
						<Pressable
							style={{
								padding: 4,
								flexDirection: "row",
								alignItems: "center",
							}}
							onPress={() => {
								setIsDisplayCategory(!isDisplayCategory);
							}}
						>
							<Text
								style={{
									fontSize: 12,
									fontFamily: "InterSemiBold",
									color: palette.primary,
									paddingHorizontal: 8,
								}}
							>
								{category}
							</Text>
							<Ionicons
								name='options-outline'
								size={24}
								color={colorScheme === "dark" ? palette.white : palette.black}
							/>
						</Pressable>
						<TouchableOpacity
							onPress={() => {
								console.log("Profile");
							}}
							style={{
								borderWidth: 1.2,
								borderColor: palette.primary,
								borderRadius: 18,
							}}
						>
							<FastImage
								source={{
									uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
								}}
								style={{
									width: 32,
									height: 32,
									borderRadius: 16,
									margin: 2,
								}}
							/>
						</TouchableOpacity>
					</View>
				</DefaultView>
				<Collapsible
					collapsed={!isDisplayScope}
					style={{
						marginHorizontal: 16,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setScope("Public");
							setIsDisplayScope(false);
						}}
						style={styles.scopeTOContainer}
					>
						<MaterialCommunityIcons
							name='earth'
							size={24}
							color={palette.primary}
							style={{ top: 5 }}
						/>
						<Text style={styles.scopeText}>Public</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setScope("college");
							setIsDisplayScope(false);
						}}
						style={styles.scopeTOContainer}
					>
						<MaterialCommunityIcons
							name='school'
							size={24}
							color={palette.primary}
							style={{ top: 5 }}
						/>
						<Text style={styles.scopeText}>College</Text>
					</TouchableOpacity>
				</Collapsible>
				<Collapsible collapsed={!isDisplayCategory}>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={TaskCategories}
						renderItem={({ item }) => (
							<View
								style={{
									margin: 6,
									borderRadius: 12,
								}}
							>
								<TouchableOpacity
									onPress={() => {
										setCategory(item);
										setIsDisplayCategory(false);
									}}
									style={{
										borderWidth: 1,
										borderRadius: 12,
										borderColor: palette.primary,
										padding: 8,
										backgroundColor:
											category === item ? palette.primary : palette.transparent,
										paddingHorizontal: 16,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text
										style={[
											styles.para,
											category === item && { color: palette.black },
										]}
									>
										{item}
									</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
				</Collapsible>
			</View>
			{isLoadingTasks && <LoadingScreen />}
			{task?.pages[0].data.length === 0 && <NothingToSee />}
			<View style={styles.container}>
				<FlatList
					data={flatData}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item?.id.toString()}
					onEndReached={onEndReachedFunc}
					onEndReachedThreshold={0.5}
					renderItem={({ item }) => <Task item={item} />}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	para: {
		fontSize: 15,
		fontFamily: "Inter",
	},
	scopeText: {
		fontSize: 18,
		paddingHorizontal: 8,
		paddingVertical: 4,
		fontFamily: "Inter",
	},
	scopeTOContainer: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 4,
		borderRadius: 12,
		paddingLeft: 8,
		padding: 2,
	},
});

export default TasksScreen;
