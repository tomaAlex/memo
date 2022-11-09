import { firestore } from "firebase-admin";
import markUserMatch from "./markUserMatch";

type UserDocumentReference = firestore.DocumentReference<User>;

const markUsersMatch = async (
	firstUserToMarkMatchFor: UserDocumentReference,
	secondUserToMarkMatchFor: UserDocumentReference,
	newMatchId: string
) => {
	await markUserMatch(firstUserToMarkMatchFor, newMatchId);
	await markUserMatch(secondUserToMarkMatchFor, newMatchId);
};

export default markUsersMatch;
