import { firebase } from "@react-native-firebase/firestore";

const buildMessage = (author: string, content: string): MatchMessage => ({
	author,
	content,
	timestamp: firebase.firestore.Timestamp.now(),
	seenBy: [],
});

export default buildMessage;
