import { firestore } from "firebase-admin";
import { getUserData } from "../../../utils";

const markUserMatch = async (userToMarkMatchFor: firestore.DocumentReference<User>, newMatchId: string) => {
	const userToMarkMatchForData = await getUserData(userToMarkMatchFor);
	const previousMatches = userToMarkMatchForData.matches;
	const wasMatchAlreadyMarked = previousMatches.includes(newMatchId);
	if (wasMatchAlreadyMarked) {
		return;
	}
	const newMatches = [...previousMatches, newMatchId];
	await userToMarkMatchFor.update({ matches: newMatches });
};

export default markUserMatch;
