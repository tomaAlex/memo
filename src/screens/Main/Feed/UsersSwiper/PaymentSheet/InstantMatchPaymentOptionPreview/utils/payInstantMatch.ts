import { firebase } from "@react-native-firebase/functions";

const payInstantMatch = async (userToInstantlyMatchId: string, cardId: string): Promise<boolean> => {
	const { data } = await firebase.functions().httpsCallable("payInstantMatch")({ userToInstantlyMatchId, cardId });
	return data as boolean;
};

export default payInstantMatch;
