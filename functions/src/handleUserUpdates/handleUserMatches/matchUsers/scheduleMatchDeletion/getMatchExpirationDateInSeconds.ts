import { firestore } from "firebase-admin";

const getMatchExpirationDateInSeconds = async (
	matchToBeScheduledForDeletionReference: firestore.DocumentReference<Match>
): Promise<number> => {
	const matchToBeScheduledForDeletionSnapshot = await matchToBeScheduledForDeletionReference.get();
	const matchToBeScheduledForDeletionData = matchToBeScheduledForDeletionSnapshot.data() as Match;
	const { expiresAt } = matchToBeScheduledForDeletionData;
	const matchExpirationDate = (expiresAt as firestore.Timestamp).toDate();
	return Math.floor(matchExpirationDate.getTime() / 1000);
};

export default getMatchExpirationDateInSeconds;
