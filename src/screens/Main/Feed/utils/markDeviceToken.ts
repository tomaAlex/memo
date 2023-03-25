import store from "redux/store";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";

export const markDeviceToken = async (): Promise<void> => {
	await messaging().registerDeviceForRemoteMessages();
	const deviceToken = await messaging().getToken();
	const { user } = store.getState();
	const savedTokens = user.tokens;
	const isDeviceTokenSaved = savedTokens.includes(deviceToken);
	if (isDeviceTokenSaved) {
		return;
	}
	const newTokens = [...savedTokens, deviceToken];
	await firestore().collection("users").doc(user.id).update({ tokens: newTokens });
};
