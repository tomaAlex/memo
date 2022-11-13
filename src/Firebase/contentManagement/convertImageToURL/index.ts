import storage from "@react-native-firebase/storage";
import getFullImagePath from "./getFullImagePath";

export const convertImageToURL = async (
	base64Image: string,
	imageSubPath?: string,
	imageName?: string
): Promise<string> => {
	const imagePath = await getFullImagePath(imageSubPath, imageName);
	const imageStorageReference = storage().ref(imagePath);
	await imageStorageReference.putString(base64Image, "data_url");
	return imageStorageReference.getDownloadURL();
};
