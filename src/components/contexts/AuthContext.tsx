import React, { createContext, useContext, useState, ReactNode } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import { User } from "@/types";

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	signIn: () => void;
	signOut: () => void;
	signedIn: boolean;
	setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [signedIn, setSignedIn] = useState(true);

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(
				userInfo.idToken
			);
			await auth().signInWithCredential(googleCredential);
			console.log(userInfo);
		} catch (error) {
			console.log(error);
		} finally {
			router.push("/getprofile");
		}
	};

	const signOut = () => {
		GoogleSignin.revokeAccess();
		GoogleSignin.signOut().then(() => {
			setUser(null);
			console.log("Signed out");
		});
	};

	return (
		<AuthContext.Provider
			value={{ user, setUser, signIn, signOut, signedIn, setSignedIn }}
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
