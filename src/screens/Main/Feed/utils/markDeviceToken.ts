import store from "redux/store";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";

const markDeviceToken = async (): Promise<void> => {
	await messaging().registerDeviceForRemoteMessages();
	console.log("before taking token");
	const deviceToken = await messaging().getToken();
	console.log({ deviceToken });
	const { user } = store.getState();
	const savedTokens = user.tokens;
	console.log({ savedTokens });
	const isDeviceTokenSaved = savedTokens.includes(deviceToken);
	if (isDeviceTokenSaved) {
		return;
	}
	const newTokens = [...savedTokens, deviceToken];
	await firestore().collection("users").doc(user.id).update({ tokens: newTokens });
};

export default markDeviceToken;
