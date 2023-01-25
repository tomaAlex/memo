import { firebase } from "@react-native-firebase/firestore";

const markSeen = async (matchId: string): Promise<void> => {
	await firebase.functions().httpsCallable("markSeen")({ matchId });
};

export default markSeen;
