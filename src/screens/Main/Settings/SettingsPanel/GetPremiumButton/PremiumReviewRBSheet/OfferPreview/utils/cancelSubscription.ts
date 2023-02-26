import { firebase } from "@react-native-firebase/firestore";

const cancelSubscription = async (): Promise<void> => {
	await firebase.functions().httpsCallable("unsubscribeFromBronze")();
};

export default cancelSubscription;
