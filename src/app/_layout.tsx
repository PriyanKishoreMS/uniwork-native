import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/components/useColorScheme";
export { ErrorBoundary } from "expo-router";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { AuthProvider } from "@/components/contexts/AuthContext";
import * as SystemUI from "expo-system-ui";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	colorScheme === "dark"
		? SystemUI.setBackgroundColorAsync(Colors.dark.background)
		: SystemUI.setBackgroundColorAsync(Colors.light.background);
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
	const [signedIn, setSignedIn] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (signedIn) {
			router.replace("/(tabs)/");
		} else {
			router.replace("/getstarted");
		}
	}, [signedIn]);

	return <Slot />;
};

const RootLayoutNav = () => {
	const colorScheme = useColorScheme();
	DefaultTheme.colors.background =
		colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<AuthProvider>
				<InitialLayout />
			</AuthProvider>
		</ThemeProvider>
	);
};
