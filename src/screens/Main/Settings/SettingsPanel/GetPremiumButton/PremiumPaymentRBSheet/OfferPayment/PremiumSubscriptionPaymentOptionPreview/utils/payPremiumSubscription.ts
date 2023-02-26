import { firebase } from "@react-native-firebase/functions";

const payPremiumSubscription = async (cardId: string): Promise<boolean> => {
	try {
		await firebase.functions().httpsCallable("subscribeToBronze")({ cardId });
		return true;
	} catch (error) {
		return false;
	}
};

export default payPremiumSubscription;
