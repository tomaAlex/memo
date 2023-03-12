import { firestore } from "firebase-admin";
import clearMatch from "../handleMatchClearance/clearMatch";

/**
 * Removes matches one by one syncronously, to avoid simultaneous writes.
 * @param {IdentifiedUser} userToHaveMatchesRemoved The user whose matches will be deleted.
 */
const deleteMatches = async (userToHaveMatchesRemoved: IdentifiedUser): Promise<void> => {
	const { matches: matchesToRemoveIds } = userToHaveMatchesRemoved;
	for (let i = 0; i < matchesToRemoveIds.length; i++) {
		const matchToRemoveId = matchesToRemoveIds[i];
		const matchDocumentToRemove = firestore().collection("matches").doc(matchToRemoveId);
		await clearMatch(matchDocumentToRemove.path);
	}
};

export default deleteMatches;
