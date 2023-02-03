import { firebase } from "@react-native-firebase/firestore";

const refreshFeatures = async (): Promise<void> => {
	await firebase.functions().httpsCallable("updateFeatureSubscriptions")();
};

export default refreshFeatures;
