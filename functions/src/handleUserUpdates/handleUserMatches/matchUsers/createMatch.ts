import { firestore } from "firebase-admin";
import { MATCH_TTL_MILLISECONDS } from "../../../constants";
import computeMatchId from "./computeMatchId";

const createMatch = async (
	firstMatchedUser: firestore.DocumentReference<User>,
	secondMatchedUser: firestore.DocumentReference<User>
): Promise<firestore.DocumentReference<Match> | null> => {
	const currentTimestamp = firestore.Timestamp.now();
	const matchToCreate: Match = {
		matchedUsers: [firstMatchedUser.id, secondMatchedUser.id],
		messages: [],
		timestamp: currentTimestamp,
		expiresAt: firestore.Timestamp.fromDate(new Date(currentTimestamp.toMillis() + MATCH_TTL_MILLISECONDS)),
		seenBy: [],
	};
	const matchToCreateId = computeMatchId(firstMatchedUser.id, secondMatchedUser.id);
	const matchToCreateDocumentReference = firestore()
		.collection("matches")
		.doc(matchToCreateId) as firestore.DocumentReference<Match>;
	const wasMatchAlreadyCreated = (await matchToCreateDocumentReference.get()).exists;
	if (wasMatchAlreadyCreated) {
		return null;
	}
	await matchToCreateDocumentReference.set(matchToCreate);
	return matchToCreateDocumentReference;
};

export default createMatch;
