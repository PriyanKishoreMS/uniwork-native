import React, { createContext, useContext, useState, ReactNode } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	signIn: (route: "/getprofile" | "/") => Promise<void>;
	signOut: () => Promise<void>;
	signedIn: Boolean;
	setSignedIn: React.Dispatch<React.SetStateAction<Boolean>>;
	checkSignedIn: () => Promise<Boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [signedIn, setSignedIn] = useState<Boolean>(false);

	const signIn = async (route: "/getprofile" | "/") => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(
				userInfo.idToken
			);
			await auth().signInWithCredential(googleCredential);
			// console.log(userInfo);
		} catch (error) {
			console.log(error);
		} finally {
			router.push(route);
		}
	};

	const signOut = async () => {
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
	};

	const checkSignedIn = async () => {
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
			const userData: User = JSON.parse(user);
			console.log(userData, "User data");
			setUser({
				name: userData.name,
				email: userData.email,
				dept: userData.dept,
				mobile: userData.mobile,
				avatar: userData?.avatar,
				college: userData.college,
			});
			setSignedIn(true);
			return true;
		}
		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				signIn,
				signOut,
				signedIn,
				setSignedIn,
				checkSignedIn,
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
