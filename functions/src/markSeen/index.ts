import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { assertUserHasMatch, getAuthenticatedUserData } from "../utils";
import markMessagesSeen from "./markMessagesSeen";

export const markSeen = functions.https.onCall(async (data, context) => {
	const matchId = data.matchId as string;

	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	assertUserHasMatch(matchId, authenticatedIdentifiedUserData);

	const matchDocumentReference = firestore().collection("matches").doc(matchId) as firestore.DocumentReference<Match>;
	const matchData = (await matchDocumentReference.get()).data() as Match;

	const { messages, seenBy } = matchData;
	const markedSeenMessages = markMessagesSeen(messages, authenticatedIdentifiedUserData.id);
	const wasMatchMarkedSeen = seenBy.includes(authenticatedIdentifiedUserData.id);

	await matchDocumentReference.update({
		messages: markedSeenMessages,
		seenBy: wasMatchMarkedSeen ? seenBy : [...seenBy, authenticatedIdentifiedUserData.id],
	});
});
