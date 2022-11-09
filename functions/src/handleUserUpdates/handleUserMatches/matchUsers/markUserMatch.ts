import { firestore } from "firebase-admin";
import { getUserData } from "../../../utils";

const markUserMatch = async (userToMarkMatchFor: firestore.DocumentReference<User>, newMatchId: string) => {
	const userToMarkMatchForData = await getUserData(userToMarkMatchFor);
	const previousMatches = userToMarkMatchForData.matches;
	const newMatches = [...previousMatches, newMatchId];
	userToMarkMatchFor.update({ matches: newMatches });
};

export default markUserMatch;
