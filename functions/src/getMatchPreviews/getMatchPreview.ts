import { firestore } from "firebase-admin";
import { assertUserHasMatch } from "../utils";
import getExclusivelyMatchedIdentifiedUsers from "./getExclusivelyMatchedIdentifiedUsers";

const getMatchPreview = async (matchId: string, requestingUser: IdentifiedUser): Promise<MatchPreview> => {
	assertUserHasMatch(matchId, requestingUser);
	const matchDocumentReference = await firestore().collection("matches").doc(matchId).get();
	const matchData = matchDocumentReference.data() as Match;
	const exclusivelyMatchedIdentifiedUsers = await getExclusivelyMatchedIdentifiedUsers(matchData, requestingUser.id);
	const { timestamp, expiresAt } = matchData;

	return {
		id: matchId,
		matchedUsers: exclusivelyMatchedIdentifiedUsers,
		timestamp,
		expiresAt,
	};
};

export default getMatchPreview;
