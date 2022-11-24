import { firestore } from "firebase-admin";
import { MAXIMUM_MATCHES } from "../constants";
import getAllNotRecommendableUserIds from "./getAllNotRecommendableUserIds";

const getAllPossiblyRecommendableUsers = async (
	authenticatedIdentifiedUserData: IdentifiedUser
): Promise<IdentifiedUser[]> => {
	const hasAlreadyMaximumMatches = authenticatedIdentifiedUserData.matches.length >= MAXIMUM_MATCHES;
	if (hasAlreadyMaximumMatches) {
		return [];
	}
	const notRecommendableUserIds = getAllNotRecommendableUserIds(authenticatedIdentifiedUserData);
	const allUsers = (await firestore().collection("users").get()) as firestore.QuerySnapshot<User>;
	const allRecommendableUserSnapshots = allUsers.docs.filter((user) => !notRecommendableUserIds.includes(user.id));
	return allRecommendableUserSnapshots.map((user) => {
		return { ...user.data(), id: user.id } as IdentifiedUser;
	});
};

export default getAllPossiblyRecommendableUsers;
