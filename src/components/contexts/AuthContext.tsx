import { Checkout, User, UserData } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	checkout: Checkout | null;
	setCheckout: React.Dispatch<React.SetStateAction<Checkout | null>>;
	signIn: (route: "/getprofile" | "/") => Promise<void>;
	signOut: () => Promise<void>;
	signedIn: Boolean;
	setSignedIn: React.Dispatch<React.SetStateAction<Boolean>>;
	checkSignedIn: () => Promise<Boolean>;
	isLoading: Boolean;
	userData: UserData | null;
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [signedIn, setSignedIn] = useState<Boolean>(false);
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	const [checkout, setCheckout] = useState<Checkout | null>(null);

	const signIn = async (route: "/getprofile" | "/") => {
		try {
			setIsLoading(true);
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(
				userInfo.idToken
			);
			await auth().signInWithCredential(googleCredential);
			setSignedIn(true);
			// console.log(userInfo);
		} catch (error) {
			console.log(error);
		} finally {
			router.replace(route);
			setIsLoading(false);
		}
	};

	const signOut = async () => {
		try {
			setIsLoading(true);
			router.replace("/signin");
			await AsyncStorage.removeItem("accessToken");
			await AsyncStorage.removeItem("refreshToken");
			await AsyncStorage.removeItem("user");
			GoogleSignin.revokeAccess();
			GoogleSignin.signOut().then(() => {
				setUser(null);
				setSignedIn(false);
				console.log("Signed out");
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const checkSignedIn = async () => {
		try {
			console.log("\n\nChecking signed in");
			const user = await AsyncStorage.getItem("user");
			const accessToken = await AsyncStorage.getItem("accessToken");
			const refreshToken = await AsyncStorage.getItem("refreshToken");
			console.log(
				user,
				accessToken,
				refreshToken,
				"User, accessToken, refreshToken"
			);
			if (user && accessToken && refreshToken) {
				const userdata: User = JSON.parse(user);
				console.log(userdata, "User data");
				setSignedIn(true);
				setUser(() => {
					return userdata;
				});
				setUserData({
					user: userdata,
					accessToken: accessToken,
					refreshToken: refreshToken,
				});
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				checkout,
				setCheckout,
				signIn,
				signOut,
				signedIn,
				setSignedIn,
				checkSignedIn,
				isLoading,
				userData,
				setUserData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
