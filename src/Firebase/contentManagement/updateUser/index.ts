import { User } from "types/index";
import prepareUploadingImages from "./prepareUploadingImages";
import firestore from "@react-native-firebase/firestore";

export const updateUser = async (previousUserDetails: User, newUserDetails: User, userId: string): Promise<void> => {
	const newUserImageURLs = await prepareUploadingImages(previousUserDetails.photos, newUserDetails.photos, userId);
	const updatedUserDetails = { ...newUserDetails, photos: newUserImageURLs };
	await firestore().collection("users").doc(userId).update(updatedUserDetails);
};
