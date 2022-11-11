import { firestore } from "firebase-admin";
import buildMessage from "./buildMessage";

const getNewMatchMessages = async (
	matchDocumentReference: firestore.DocumentReference<Match>,
	author: string,
	content: string
): Promise<MatchMessage[]> => {
	const matchData = (await matchDocumentReference.get()).data() as Match;
	const previousMessages = matchData.messages;
	const messageToBeCreated = buildMessage(author, content);
	return [...previousMessages, messageToBeCreated];
};

export default getNewMatchMessages;
