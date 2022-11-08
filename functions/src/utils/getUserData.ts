import { firestore } from "firebase-admin";

export const getUserData = async (userToGetDataFor: firestore.DocumentReference<firestore.DocumentData>) => {
	const authenticatedUserSnapshotData = await userToGetDataFor.get();
	return authenticatedUserSnapshotData.data() as firestore.DocumentData;
};
