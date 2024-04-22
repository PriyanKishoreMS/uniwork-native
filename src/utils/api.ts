import { ipAddrPort } from "../../temp/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData as UserDataType, FormData as FormDataType } from "@/types";

export const refreshToken = async (
	refreshToken: string,
	signOut: () => Promise<void>
) => {
	try {
		const updatedAccessToken = await fetch(
			`${ipAddrPort}/security/refreshToken`,
			options("POST", String(refreshToken))
		);
		const updatedAccessTokenJson = await updatedAccessToken.json();
		console.log(updatedAccessTokenJson, "this is token json");
		await AsyncStorage.setItem(
			"accessToken",
			updatedAccessTokenJson.accessToken
		);
		const allKeys = await AsyncStorage.getAllKeys();
		console.log("\n\nThis is all keys", allKeys);
	} catch (error) {
		signOut();
		console.error(error);
	}
};

const options = (
	method: "GET" | "POST" | "PATCH" | "DELETE",
	Token: string
) => {
	return {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${Token}`,
		},
	};
};

export const fetchTasks = async (
	pageParam = 1,
	userData: UserDataType | null,
	signOut: () => Promise<void>,
	category: string
) => {
	try {
		const accessToken = userData?.accessToken;
		const response = await fetch(
			`${ipAddrPort}/task?page_size=10&page=${pageParam}&sort=-created_at&category=${category}`,
			options("GET", String(accessToken))
		);
		if (!response.ok) {
			if (response.status === 401) {
				await refreshToken(String(userData?.refreshToken), signOut);
			}
		}
		const res = await response.json();
		console.log(res, "res");
		return res;
	} catch (err) {
		console.log(err, "\n\n\nerror status");
		console.log(err);
	}
};

export const fetchUserTasks = async (
	pageParam = 1,
	userData: UserDataType | null,
	signOut: () => Promise<void>,
	uid: number | undefined
) => {
	try {
		const accessToken = userData?.accessToken;
		const response = await fetch(
			`${ipAddrPort}/task/user/${uid}?page_size=10&page=${pageParam}&sort=-created_at`,
			options("GET", String(accessToken))
		);
		if (!response.ok) {
			if (response.status === 401) {
				await refreshToken(String(userData?.refreshToken), signOut);
			}
		}
		const res = await response.json();
		console.log(res, "userTasks");
		return res;
	} catch (err) {
		console.log(err, "\n\n\nerror status");
		console.log(err);
	}
};

export const postTask = async (data: FormDataType) => {
	try {
		const formdata = new FormData();
		formdata.append("title", data.title);
		formdata.append("description", data.description);
		formdata.append("price", data.price.toString());
		formdata.append("category", data.category);
		formdata.append("expiry", data.expiry);
		console.log(data.expiry, "expiry data\n");
		formdata.append("status", "open");

		if (data.images) {
			for (const asset of data.images) {
				formdata.append("images", {
					uri: asset.uri,
					name: asset.fileName,
					type: asset.mimeType,
				} as any);
			}
		}
		if (data.files) {
			for (const asset of data.files) {
				formdata.append("files", {
					uri: asset.uri,
					name: asset.name,
					type: asset.mimeType,
				} as any);
			}
		}

		const accessToken = await AsyncStorage.getItem("accessToken");
		const response = await fetch(`${ipAddrPort}/task`, {
			method: "POST",
			headers: {
				"content-type": "multipart/form-data",
				Accept: "multipart/form-data",
				Authorization: `Bearer ${accessToken}`,
			},
			body: formdata,
		});

		const res = await response.json();
		console.log(res, "response");
		return res;
	} catch (error) {
		console.error(error, "error here");
	}
};
