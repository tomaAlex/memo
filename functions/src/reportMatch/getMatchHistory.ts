import { firestore } from "firebase-admin";
import clearMatch from "../handleMatchClearance/clearMatch";

const getMatchHistory = async (matchId: string): Promise<MatchMessage[]> => {
	const matchDocumentReference = firestore().collection("matches").doc(matchId) as firestore.DocumentReference<Match>;
	const matchData = (await matchDocumentReference.get()).data() as Match;
	const { messages: matchHistory } = matchData;
	await clearMatch(matchDocumentReference.path);
	return matchHistory;
};

export default getMatchHistory;
