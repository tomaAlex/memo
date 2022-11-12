import { firebase } from "@react-native-firebase/firestore";
import { MatchMessage } from "types/index";

const sendMessage = async (matchId: string, messageContent: string): Promise<MatchMessage> => {
	const { data } = await firebase.functions().httpsCallable("sendMessage")({ matchId, content: messageContent });
	return data as MatchMessage;
};

export default sendMessage;
