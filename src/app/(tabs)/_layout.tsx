import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

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
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: "Tasks",
					headerTitle: "Uniwork",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='people'
				options={{
					title: "People",
					headerTitle: "Uniwork",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='notification'
				options={{
					title: "Notifications",
					headerTitle: "Uniwork",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: "Profile",
					headerTitle: "Uniwork",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
				}}
			/>
		</Tabs>
	);
}
