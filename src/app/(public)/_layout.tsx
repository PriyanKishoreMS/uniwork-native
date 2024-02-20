import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";

const PublicLayout = () => {
	const colorScheme = useColorScheme();
	return (
		<Stack
			screenOptions={{
				contentStyle: {
					backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
				},
			}}
		>
			<Stack.Screen
				name='signin'
				options={{
					headerTitle: "Signin",
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
				}}
			/>
		</Stack>
	);
};

export default PublicLayout;
