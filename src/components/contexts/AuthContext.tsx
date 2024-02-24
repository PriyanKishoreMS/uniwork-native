import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
	name: string;
	mobile: string;
	college: string;
	department: string;
}

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	signIn: (userData: User) => void;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const signIn = (userData: User) => {
		setUser(userData);
	};

	const signOut = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
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
