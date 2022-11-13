import { User } from "types/index";
import uploadUserImages from "./uploadUserImages";

const prepareUserCreation = async (unpreparedForCreationUser: User, uid: string): Promise<void> => {
	const uploadedUserImages = await uploadUserImages(unpreparedForCreationUser.photos, uid);
	unpreparedForCreationUser.photos = uploadedUserImages;
};

export default prepareUserCreation;
