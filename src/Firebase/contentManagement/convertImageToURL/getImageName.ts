import storage from "@react-native-firebase/storage";

const getImageName = async (namelessImagePath: string, imageName?: string): Promise<string> => {
	if (imageName) {
		return imageName;
	}
	const imagesCollectionReference = storage().ref(namelessImagePath);
	const currentColectionImages = await imagesCollectionReference.listAll();
	const numberOfImages = currentColectionImages.items.length;
	return numberOfImages.toString();
};

export default getImageName;
