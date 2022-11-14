import isImageNotUploaded from "./isImageNotUploaded";
import { convertImageToURL } from "../../convertImageToURL";

const uploadNewImages = async (newUserImages: string[], userId: string): Promise<string[]> => {
	const uploadedUserImageURLs: string[] = [];
	for (const newUserImage of newUserImages) {
		const uploadedUserImageURL = isImageNotUploaded(newUserImage)
			? await convertImageToURL(newUserImage, userId)
			: newUserImage;
		uploadedUserImageURLs.push(uploadedUserImageURL);
	}
	return uploadedUserImageURLs;
};

export default uploadNewImages;
