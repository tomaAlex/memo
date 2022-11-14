import removeDeleteImages from "./removeDeleteImages";
import uploadNewImages from "./uploadNewImages";

const prepareUploadingImages = async (
	previousUserImages: string[],
	newUserImages: string[],
	userId: string
): Promise<string[]> => {
	await removeDeleteImages(previousUserImages, newUserImages);
	return uploadNewImages(newUserImages, userId);
};

export default prepareUploadingImages;
