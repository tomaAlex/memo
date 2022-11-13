import { convertImageToURL } from "../../../contentManagement";

const uploadUserImages = async (userImages: string[], userId: string): Promise<string[]> => {
	const uploadedUserImageURLs: string[] = [];
	for (let i = 0; i < userImages.length; i++) {
		const uploadedUserImageURL = await convertImageToURL(userImages[i], userId);
		uploadedUserImageURLs.push(uploadedUserImageURL);
	}
	return uploadedUserImageURLs;
};

export default uploadUserImages;
