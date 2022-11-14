import { deleteImage } from "../../deleteImage";
import gatherDeletedImageURLs from "./gatherDeletedImageURLs";

const removeDeleteImages = async (previousUserImages: string[], newUserImages: string[]): Promise<void> => {
	const deletedImageURLs = gatherDeletedImageURLs(previousUserImages, newUserImages);
	const pendingImageURLDeletions = deletedImageURLs.map((deletedImageURL) => deleteImage(deletedImageURL));
	await Promise.all(pendingImageURLDeletions);
};

export default removeDeleteImages;
