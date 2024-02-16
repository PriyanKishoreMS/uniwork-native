import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
			}}
		>
			<Tabs.Screen
				name='tasks'
				options={{
					headerTitleAlign: "center",
					title: "Uniwork",
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='people'
				options={{
					headerTitleAlign: "center",
					title: "Uniwork",
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					headerTitleAlign: "center",
					title: "Uniwork",
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
		</Tabs>
	);
}
