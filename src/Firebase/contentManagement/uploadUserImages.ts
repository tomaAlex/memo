import { convertImageToURL } from "./convertImageToURL";

export const uploadUserImages = async (userImages: string[], userId: string): Promise<string[]> => {
	const uploadedUserImageURLs: string[] = [];
	for (let i = 0; i < userImages.length; i++) {
		const uploadedUserImageURL = await convertImageToURL(userImages[i], userId, i.toString());
		uploadedUserImageURLs.push(uploadedUserImageURL);
	}
	return uploadedUserImageURLs;
};
