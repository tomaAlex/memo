import { firebase } from "@react-native-firebase/firestore";

const sendMessageNotification = async (matchId: string, messageContent: string) => {
	await firebase.functions().httpsCallable("sendMessageNotification")({ matchId, content: messageContent });
};

export default sendMessageNotification;
