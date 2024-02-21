import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

const PublicLayout = () => {
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
				name='signin'
				options={{
					headerTitle: "UniWork",
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? Colors.dark.background
								: Colors.light.background,
					},
					headerTitleStyle: {
						fontFamily: "InterSemiBold",
					},
				}}
			/>

			<Stack.Screen
				name='getstarted'
				options={{
					headerTitle: "UniWork",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontFamily: "InterSemiBold",
					},
					headerStyle: {
						backgroundColor:
							colorScheme === "dark"
								? Colors.dark.background
								: Colors.light.background,
					},
				}}
			/>
		</Stack>
	);
};

export default PublicLayout;
