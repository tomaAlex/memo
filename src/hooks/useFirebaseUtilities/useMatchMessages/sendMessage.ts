import { firebase } from "@react-native-firebase/firestore";

const sendMessage = (matchId: string, messageContent: string) => {
	return firebase.functions().httpsCallable("sendMessage")({ matchId, messageContent });
};

export default sendMessage;
