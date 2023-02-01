import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { ActionCreator } from "redux";
import { NotificationAction, NotificationActions } from "types/index";

const clearAction: ActionCreator<NotificationAction<null>> = () => ({
	type: NotificationActions.CLEAR_NOTIFICATION,
	payload: null,
});

const addAction: ActionCreator<NotificationAction> = (notification: FirebaseMessagingTypes.RemoteMessage) => ({
	type: NotificationActions.ADD_NOTIFICATION,
	payload: notification,
});

const generateNotificationActions = {
	add: addAction,
	clear: clearAction,
};

export default generateNotificationActions;
