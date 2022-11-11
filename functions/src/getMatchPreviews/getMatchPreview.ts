import { firestore } from "firebase-admin";
import { assertUserHasMatch } from "../utils";
import getExclusivelyMatchedIdentifiedUsers from "./getExclusivelyMatchedIdentifiedUsers";

const getMatchPreview = async (matchId: string, requestingUser: IdentifiedUser): Promise<MatchPreview> => {
	assertUserHasMatch(matchId, requestingUser);
	const matchDocumentReference = await firestore().collection("matches").doc(matchId).get();
	const matchData = matchDocumentReference.data() as Match;
	const exclusivelyMatchedIdentifiedUsers = await getExclusivelyMatchedIdentifiedUsers(matchData, requestingUser.id);
	const { messages } = matchData;
	const areThereMessages = messages.length > 0;
	const lastMessage = areThereMessages ? messages[messages.length - 1] : null;
	return {
		id: matchId,
		matchedUsers: exclusivelyMatchedIdentifiedUsers,
		lastMessage,
	};
};

export default getMatchPreview;
