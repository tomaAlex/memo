import { firebase } from "@react-native-firebase/functions";

const cashOut = async (bankId: string): Promise<boolean> => {
	const { data } = await firebase.functions().httpsCallable("cashOut")({ bankId });
	return data as boolean;
};

export default cashOut;
