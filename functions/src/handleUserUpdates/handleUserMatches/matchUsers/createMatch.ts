import { firestore } from "firebase-admin";

const createMatch = (
	firstMatchedUser: firestore.DocumentReference<User>,
	secondMatchedUser: firestore.DocumentReference<User>
) => {
	const matchToCreate: Match = {
		matchedUsers: [firstMatchedUser.id, secondMatchedUser.id],
		messages: [],
		timestamp: firestore.Timestamp.now(),
	};
	return firestore().collection("matches").add(matchToCreate) as Promise<firestore.DocumentReference<Match>>;
};

export default createMatch;
