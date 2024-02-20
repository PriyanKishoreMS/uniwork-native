import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
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
					headerTitle: "Get Started",
				}}
			/>
		</Stack>
	);
};

export default PublicLayout;
