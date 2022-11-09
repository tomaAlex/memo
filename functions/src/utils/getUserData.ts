import { firestore } from "firebase-admin";

export const getUserData = async (userToGetDataFor: firestore.DocumentReference<User>) => {
	const authenticatedUserSnapshotData = await userToGetDataFor.get();
	return authenticatedUserSnapshotData.data() as User;
};
