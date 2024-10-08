import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

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
			<Stack.Screen
				name='CheckOut'
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
		</Stack>
	);
};

export default DetailsLayout;
