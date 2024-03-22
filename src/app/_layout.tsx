import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/components/useColorScheme";
export { ErrorBoundary } from "expo-router";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { MenuProvider } from "react-native-popup-menu";
import * as SystemUI from "expo-system-ui";
import { useAuth } from "@/components/contexts/AuthContext";
export const unstable_settings = {
	initialRouteName: "(tabs)",
};
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Inter: require("../../assets/fonts/InterDisplay-Regular.ttf"),
		InterBold: require("../../assets/fonts/InterDisplay-Bold.ttf"),
		InterSemiBold: require("../../assets/fonts/InterDisplay-SemiBold.ttf"),
		InterLight: require("../../assets/fonts/InterDisplay-Light.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

const InitialLayout = () => {
	const router = useRouter();
	const { signedIn, checkSignedIn } = useAuth();

	useEffect(() => {
		checkSignedIn().then(res => {
			if (res) {
				router.replace("/(tabs)/");
			} else {
				router.replace("/getstarted");
			}
		});
	}, []);

	// useEffect(() => {
	// 	if (signedIn) {
	// 		router.replace("/(tabs)/");
	// 	} else {
	// 		router.replace("/getstarted");
	// 	}
	// }, [signedIn]);

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
};

const RootLayoutNav = () => {
	const colorScheme = useColorScheme();
	colorScheme === "dark"
		? SystemUI.setBackgroundColorAsync(Colors.dark.background)
		: SystemUI.setBackgroundColorAsync(Colors.light.background);
	DefaultTheme.colors.background =
		colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
	const queryClient = new QueryClient();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<MenuProvider>
						<InitialLayout />
					</MenuProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};
