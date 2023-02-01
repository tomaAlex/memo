import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { XOR } from "types/XOR";
import { GeneralAction } from "./general";

export enum NotificationActions {
	ADD_NOTIFICATION = "ADD_NOTIFICATION",
	CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION",
}

export interface NotificationAction<
	T extends XOR<FirebaseMessagingTypes.RemoteMessage, null> = FirebaseMessagingTypes.RemoteMessage
> extends GeneralAction {
	type: NotificationActions;
	payload: T;
}
