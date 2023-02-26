import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { ScreenNames, ScreenProps } from "types";

class NotificationManager {
	notification: FirebaseMessagingTypes.RemoteMessage;
	navigation: ScreenProps<ScreenNames>["navigation"];
	constructor(notification: FirebaseMessagingTypes.RemoteMessage, navigation: ScreenProps<ScreenNames>["navigation"]) {
		this.notification = notification;
		this.navigation = navigation;
	}

	/**
	 * This method handles when the app is opened
	 * from a background state. The default behaviour
	 * is to open the main feed screen. This can be
	 * overriden for complex behaviour.
	 */
	handleBackground(): void {}

	/**
	 * This method handles when the app is opened
	 * from a closed state. The default behaviour
	 * is to open the main feed screen. This can be
	 * overriden for complex behaviour.
	 */
	handleOnOpenApp(): void {}
}

export default NotificationManager;
