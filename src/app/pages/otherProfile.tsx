import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Fragment } from "react";
import ProfileDetail from "@/app/pages/ProfileDetail";
import { palette } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import TaskAssigned from "../(tabs)/(profile)/taskassigned";
import TaskTodo from "../(tabs)/(profile)/tasktodo";

const Tab = createMaterialTopTabNavigator();

const OtherProfile = () => {
	const colorScheme = useColorScheme();
	const { UserId } = useLocalSearchParams();
	const userIdNumber = Array.isArray(UserId)
		? parseInt(UserId.toString())
		: parseInt(UserId);
	console.log(userIdNumber, "userIdNumber in otherprofile");
	return (
		<Fragment>
			<ProfileDetail userId={userIdNumber} />
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: palette.primary,
					tabBarInactiveTintColor: palette.grayLight2,
					tabBarAndroidRipple: {
						color: "#94D6F233",
					},
					tabBarStyle: {
						backgroundColor:
							colorScheme === "dark" ? palette.grayDark : palette.grayLight2,
					},
					tabBarItemStyle: {
						flexDirection: "row",
					},
					tabBarIndicatorStyle: {
						backgroundColor: palette.primary,
					},
				}}
			>
				<Tab.Screen
					name='taskassigned'
					options={{
						title: "Assigned",
						tabBarLabelStyle: {
							fontFamily: "InterSemiBold",
							textTransform: "none",
							fontSize: 16,
						},
						tabBarIcon: ({ color }) => (
							<MaterialIcons name='assignment-add' size={24} color={color} />
						),
					}}
					children={() => <TaskAssigned userId={userIdNumber} />}
				/>
				<Tab.Screen
					name='todo'
					component={TaskTodo}
					options={{
						title: "To Do",
						tabBarLabelStyle: {
							fontFamily: "InterSemiBold",
							textTransform: "none",
							fontSize: 16,
						},
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name='clipboard-list'
								size={24}
								color={color}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		</Fragment>
	);
};

export default OtherProfile;
