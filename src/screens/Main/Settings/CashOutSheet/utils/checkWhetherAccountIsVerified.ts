import { firebase } from "@react-native-firebase/functions";

const checkWhetherAccountIsVerified = async (): Promise<boolean> => {
	const { data } = await firebase.functions().httpsCallable("decideWhetherUserCanCashOut")();
	return data as boolean;
};

export default checkWhetherAccountIsVerified;
