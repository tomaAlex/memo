import { firestore } from "firebase-admin";
import createMatch from "./createMatch";
import markUsersMatch from "./markUsersMatch";

const matchUsers = async (
	firstMatchedUser: firestore.DocumentReference<User>,
	secondMatchedUser: firestore.DocumentReference<User>
) => {
	const createdMatch = await createMatch(firstMatchedUser, secondMatchedUser);
	await markUsersMatch(firstMatchedUser, secondMatchedUser, createdMatch.id);
};

export default matchUsers;
