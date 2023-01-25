import { firestore } from "firebase-admin";
import createMatch from "./createMatch";
import markUsersMatch from "./markUsersMatch";
import notifyMatchers from "./notifyMatchers";
import scheduleMatchDeletion from "./scheduleMatchDeletion";

const matchUsers = async (
	firstMatchedUser: firestore.DocumentReference<User>,
	secondMatchedUser: firestore.DocumentReference<User>
) => {
	const createdMatch = await createMatch(firstMatchedUser, secondMatchedUser);
	if (!createdMatch) {
		return;
	}
	await notifyMatchers([firstMatchedUser.id, secondMatchedUser.id]);
	await scheduleMatchDeletion(createdMatch);
	await markUsersMatch(firstMatchedUser, secondMatchedUser, createdMatch.id);
};

export default matchUsers;
