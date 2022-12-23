import { firestore } from "firebase-admin";

const buildMessage = (author: string, content: string): MatchMessage => ({
	author,
	content,
	timestamp: firestore.Timestamp.now(),
	seenBy: [],
});

export default buildMessage;
