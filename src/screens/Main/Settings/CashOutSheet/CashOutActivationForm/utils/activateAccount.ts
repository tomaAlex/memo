import { firebase } from "@react-native-firebase/firestore";

const activateAccount = async (
	businessMcc: string,
	businessWebsite: string,
	termsAndConditions: boolean
): Promise<void> => {
	await firebase.functions().httpsCallable("verifyConnectAccount")({
		businessMcc,
		businessWebsite,
		acceptedTOS: termsAndConditions,
	});
};

export default activateAccount;
