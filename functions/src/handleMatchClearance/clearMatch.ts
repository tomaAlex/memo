import { firestore } from "firebase-admin";
import clearUsersMatch from "./clearUsersMatch";
import clearDocument from "../handleDocumentClearance/clearDocument";

const clearMatch = async (matchDocumentToClearPath: string): Promise<void> => {
	const matchToClearReference = firestore().doc(matchDocumentToClearPath);
	const matchToClearSnapshot = await matchToClearReference.get();
	const matchToClearData = matchToClearSnapshot.data() as Match;
	await clearUsersMatch(matchToClearData.matchedUsers, matchToClearReference.id);
	await clearDocument(matchDocumentToClearPath);
};

export default clearMatch;
