import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { handleDocumentClearance } from "../handleDocumentClearance";
import clearUsersMatch from "./clearUsersMatch";

export const handleMatchClearance = functions.https.onRequest(async (req, res) => {
	const { documentToClearPath } = req.body as DocumentClearancePayload;
	const matchToClearReference = firestore().doc(documentToClearPath);
	const matchToClearSnapshot = await matchToClearReference.get();
	const matchToClearData = matchToClearSnapshot.data() as Match;
	await clearUsersMatch(matchToClearData.matchedUsers, matchToClearReference.id);
	await handleDocumentClearance(req, res);
});
