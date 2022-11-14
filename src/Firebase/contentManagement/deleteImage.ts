import storage from "@react-native-firebase/storage";

export const deleteImage = (imageUrlToDelete: string): Promise<void> => {
	const imageToDeleteReference = storage().refFromURL(imageUrlToDelete);
	return imageToDeleteReference.delete();
};
