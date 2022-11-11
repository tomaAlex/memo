import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { assertUserHasMatch, getAuthenticatedUserData } from "../utils";
import buildMessage from "./buildMessage";

export const sendMessage = functions.https.onCall(async (data, context) => {
	const matchId = data.matchId as string;
	const content = data.content as string;

	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	assertUserHasMatch(matchId, authenticatedIdentifiedUserData);

	const matchDocumentReference = (await firestore()
		.collection("matches")
		.doc(matchId)) as firestore.DocumentReference<Match>;

	const matchData = (await matchDocumentReference.get()).data() as Match;
	const messageToBeCreated = buildMessage(authenticatedIdentifiedUserData.id, content);
	const newMessages = [...matchData.messages, messageToBeCreated];

	await matchDocumentReference.update({ messages: newMessages });
});
