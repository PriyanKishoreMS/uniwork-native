import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
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
					title: "Tasks",
					tabBarShowLabel: false,
					headerTitle: "Uniwork",
					
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='add-task' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='people'
				options={{
					title: "Discover",
					tabBarShowLabel: false,
					headerTitle: "Uniwork",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => <TabBarIcon name='search' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='notification'
				options={{
					title: "Notifications",
					tabBarShowLabel: false,
					headerTitle: "Uniwork",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='notifications-on' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: "Profile",
					tabBarShowLabel: false,
					headerTitle: "Uniwork",
					headerTitleAlign: "center",
					tabBarIcon: ({ color }) => <TabBarIcon name='person' color={color} />,
				}}
			/>
		</Tabs>
	);
}
