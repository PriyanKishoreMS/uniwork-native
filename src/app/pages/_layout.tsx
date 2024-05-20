import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

const DetailsLayout = () => {
	const colorScheme = useColorScheme();
	return (
		<Stack
			screenOptions={{
				contentStyle: {
					backgroundColor:
						colorScheme === "dark"
							? Colors.dark.background
							: Colors.light.background,
				},
			}}
		>
			<Stack.Screen
				name='taskDetails'
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name='ProfileDetail'
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name='otherProfile'
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
		</Stack>
	);
};

export default DetailsLayout;
