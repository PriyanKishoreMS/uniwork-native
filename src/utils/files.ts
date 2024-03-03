import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export const pickImage = async () => {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [1, 1],
		quality: 1,
	});

	return result;
};

export const pickMultipleImages = async () => {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsMultipleSelection: true,
		quality: 1,
	});

	return result;
};

export const pickMultipleFiles = async () => {
	let result = await DocumentPicker.getDocumentAsync({
		type: [
			"application/pdf",
			"application/msword",
			"application/vnd.ms-excel",
			"application/vnd.ms-powerpoint",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.openxmlformats-officedocument.presentationml.presentation",
			"application/zip",
			"application/jpeg",
			"application/png",
		],
		multiple: true,
	});

	return result;
};
