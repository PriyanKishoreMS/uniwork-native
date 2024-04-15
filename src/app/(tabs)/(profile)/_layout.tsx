import React from "react";
import {
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationOptions,
	MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { Fragment } from "react";
import ProfileDetail from "@/app/pages/ProfileDetail";
import { palette } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator);

const ProfileLayout = () => {
	const colorScheme = useColorScheme();
	return (
		<Fragment>
			<ProfileDetail />
			<MaterialTopTabs
				screenOptions={{
					tabBarActiveTintColor: palette.primary,
					tabBarInactiveTintColor: palette.grayLight2,
					tabBarAndroidRipple: {
						color: palette.primary,
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
				<MaterialTopTabs.Screen
					name='tasktodo'
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
				<MaterialTopTabs.Screen
					name='taskassigned'
					options={{
						title: "Task Assigned",
						tabBarLabelStyle: {
							fontFamily: "InterSemiBold",
							textTransform: "none",
							fontSize: 16,
						},
						tabBarIcon: ({ color }) => (
							<MaterialIcons name='assignment-add' size={24} color={color} />
						),
					}}
				/>
			</MaterialTopTabs>
		</Fragment>
	);
};

export default ProfileLayout;
