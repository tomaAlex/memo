import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import notifyReceivers from "../sendMessage/notifyReceivers";
import { getAuthenticatedUserData } from "../utils";

export const sendMessageNotification = functions.https.onCall(async (data, context) => {
	const matchId = data.matchId as string;
	const content = data.content as string;
	const matchDocumentReference = firestore().collection("matches").doc(matchId) as firestore.DocumentReference<Match>;
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const matchData = (await matchDocumentReference.get()).data() as Match;
	notifyReceivers(matchData, authenticatedIdentifiedUserData.id, content, matchId);
});
