import TaskAssigned from "@/app/(tabs)/(profile)/taskassigned";
import MyTaskTodo from "@/app/(tabs)/(profile)/tasktodo";
import ProfileDetail from "@/app/pages/ProfileDetail";
import { palette } from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { Fragment } from "react";
import { useColorScheme } from "react-native";

const Tab = createMaterialTopTabNavigator();

// 2 diff versions of this exists (this _layout.tsx and otherProfile.tsx) because can't use this file for other profile since it is a tab layout. If this was used for other profile, it swaps the profile tab with the other user details.

const ProfileLayout = () => {
	const colorScheme = useColorScheme();

	return (
		<Fragment>
			<ProfileDetail />
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
					children={() => <TaskAssigned />}
				/>
				<Tab.Screen
					name='todo'
					children={() => <MyTaskTodo />}
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

export default ProfileLayout;
