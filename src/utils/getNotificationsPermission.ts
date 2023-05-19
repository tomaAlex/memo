import messaging from "@react-native-firebase/messaging";
import { requestNotifications } from "react-native-permissions";

export const getNotificationsPermission = async (): Promise<void> => {
	const messagingPermission = await messaging().requestPermission();
	const notificationsResponse = await requestNotifications(["alert", "sound", "badge"]);
	if (messagingPermission === messaging.AuthorizationStatus.AUTHORIZED && notificationsResponse.status === "granted") {
		return;
	}
	throw new Error("Notifications permission denied");
};
