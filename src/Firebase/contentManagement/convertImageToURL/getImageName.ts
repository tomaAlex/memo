import storage from "@react-native-firebase/storage";

const getImageName = async (namelessImagePath: string, imageName?: string): Promise<string> => {
	if (imageName) {
		return imageName;
	}
	const imagesCollectionReference = storage().ref(namelessImagePath);
	const currentCollectionImages = await imagesCollectionReference.listAll();
	const totalAmountOfImages = currentCollectionImages.items.length;
	if (totalAmountOfImages === 0) {
		return "0";
	}
	// get the image names without the extension
	const allImageNames = currentCollectionImages.items.map((image) => {
		const imageNameWithExtension = image.name;
		const imageNameExtensionStartingIndex = imageNameWithExtension.lastIndexOf(".");
		return imageNameWithExtension.substring(0, imageNameExtensionStartingIndex);
	});
	const allImageIndexes = allImageNames.map((imageStringIndex) => parseInt(imageStringIndex, 10));
	const maxImageIndex = Math.max(...allImageIndexes);
	const newImageIndex = maxImageIndex + 1;
	return newImageIndex.toString();
};

export default getImageName;
