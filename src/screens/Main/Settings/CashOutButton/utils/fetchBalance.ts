import { firebase } from "@react-native-firebase/functions";

const fetchBalance = async (): Promise<number> => {
	const { data } = await firebase.functions().httpsCallable("getBalance")();
	return data as number;
};

export default fetchBalance;
