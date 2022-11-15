import { firestore } from "firebase-admin";

const clearUserMatch = async (
	userToHaveMatchClearedId: string,
	matchToClearId: string,
	matchingUserToUnlikeIds: string[]
): Promise<void> => {
	const userToHaveMatchClearedReference = firestore().collection("users").doc(userToHaveMatchClearedId);
	const userToHaveMatchClearedSnapshot = await userToHaveMatchClearedReference.get();
	const userToHaveMatchClearedData = userToHaveMatchClearedSnapshot.data() as User;
	const currentUserMatchIds = userToHaveMatchClearedData.matches;
	const clearedUserMatchIds = currentUserMatchIds.filter((matchId) => matchId !== matchToClearId);
	const clearedUserLikeIds = userToHaveMatchClearedData.likes.filter(
		(likeId) => !matchingUserToUnlikeIds.includes(likeId)
	);
	await userToHaveMatchClearedReference.update({
		matches: clearedUserMatchIds,
		likes: clearedUserLikeIds,
	});
};

export default clearUserMatch;
