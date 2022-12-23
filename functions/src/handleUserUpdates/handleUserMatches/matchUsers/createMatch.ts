import { firestore } from "firebase-admin";
import { MATCH_TTL_MILLISECONDS } from "../../../constants";

const createMatch = (
	firstMatchedUser: firestore.DocumentReference<User>,
	secondMatchedUser: firestore.DocumentReference<User>
) => {
	const currentTimestamp = firestore.Timestamp.now();
	const matchToCreate: Match = {
		matchedUsers: [firstMatchedUser.id, secondMatchedUser.id],
		messages: [],
		timestamp: currentTimestamp,
		expiresAt: firestore.Timestamp.fromDate(new Date(currentTimestamp.toMillis() + MATCH_TTL_MILLISECONDS)),
		seenBy: [],
	};
	return firestore().collection("matches").add(matchToCreate) as Promise<firestore.DocumentReference<Match>>;
};

export default createMatch;
