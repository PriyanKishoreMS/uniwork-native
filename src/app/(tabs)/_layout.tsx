import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Colors, { palette } from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof MaterialIcons>["name"];
	color: string;
}) {
	return <MaterialIcons size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					headerTitle: "UniWork",
					headerTitleAlign: "center",
					tabBarShowLabel: false,
					headerTitleStyle: {
						fontFamily: "InterSemiBold",
					},
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? Colors.dark.background
								: Colors.light.background,
					},
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='add-task' color={color} />
					),
					tabBarActiveTintColor: palette.primary,
				}}
			/>
			<Tabs.Screen
				name='people'
				options={{
					headerTitle: "UniWork",
					headerTitleAlign: "center",
					tabBarShowLabel: false,
					headerTitleStyle: {
						fontFamily: "InterSemiBold",
					},
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? Colors.dark.background
								: Colors.light.background,
					},
					tabBarIcon: ({ color }) => <TabBarIcon name='search' color={color} />,
					tabBarActiveTintColor: palette.primary,
				}}
			/>
			<Tabs.Screen
				name='notification'
				options={{
					headerTitle: "UniWork",
					headerTitleAlign: "center",
					tabBarShowLabel: false,
					headerTitleStyle: {
						fontFamily: "InterSemiBold",
					},
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? Colors.dark.background
								: Colors.light.background,
					},
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='notifications-on' color={color} />
					),
					tabBarActiveTintColor: palette.primary,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					headerTitle: "UniWork",
					headerTitleAlign: "center",
					tabBarShowLabel: false,
					headerTitleStyle: {
						fontFamily: "InterSemiBold",
					},
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? Colors.dark.background
								: Colors.light.background,
					},
					tabBarIcon: ({ color }) => <TabBarIcon name='person' color={color} />,
					tabBarActiveTintColor: palette.primary,
				}}
			/>
		</Tabs>
	);
}
