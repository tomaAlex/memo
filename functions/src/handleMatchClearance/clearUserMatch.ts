import { firestore } from "firebase-admin";

const clearUserMatch = async (userToHaveMatchClearedId: string, matchToClearId: string): Promise<void> => {
	const userToHaveMatchClearedReference = firestore().collection("users").doc(userToHaveMatchClearedId);
	const userToHaveMatchClearedSnapshot = await userToHaveMatchClearedReference.get();
	const userToHaveMatchClearedData = userToHaveMatchClearedSnapshot.data() as User;
	const currentUserMatchIds = userToHaveMatchClearedData.matches;
	const clearedUserMatchIds = currentUserMatchIds.filter((matchId) => matchId !== matchToClearId);
	await userToHaveMatchClearedReference.update({
		matches: clearedUserMatchIds,
	});
};

export default clearUserMatch;
