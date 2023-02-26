import { Reducer } from "redux";
import { NotificationAction, NotificationActions } from "types";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export type ReducerType = Reducer<
	FirebaseMessagingTypes.RemoteMessage | null,
	NotificationAction<FirebaseMessagingTypes.RemoteMessage | null>
>;

const reducer: ReducerType = (state = null, { type, payload }): FirebaseMessagingTypes.RemoteMessage | null => {
	switch (type) {
		case NotificationActions.CLEAR_NOTIFICATION:
			return null;

		case NotificationActions.ADD_NOTIFICATION:
			return payload;

		default:
			return state;
	}
};

export default reducer;
