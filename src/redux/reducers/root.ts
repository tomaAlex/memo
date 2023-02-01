import { combineReducers, Reducer } from "redux";
import userReducer from "./user";
import notificationReducer from "./notification";
import matchPreviewsReducer from "./matchPreviews";
import awaitingLoginReducer from "./awaitingLogin";
import { filterActions } from "redux-ignore";
import {
	UserAction,
	UserActions,
	IdentifiedUser,
	MatchPreviewsActions,
	MatchPreviewsAction,
	MatchPreview,
	AwaitingLoginActions,
	AwaitingLoginAction,
	NotificationAction,
	NotificationActions,
} from "types/index";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

const reducer = combineReducers({
	user: filterActions(userReducer as Reducer<IdentifiedUser>, (action) =>
		Object.values(UserActions).includes(action.type)
	) as Reducer<IdentifiedUser, UserAction>,
	matchPreviews: filterActions(matchPreviewsReducer as Reducer<MatchPreview[]>, (action) =>
		Object.values(MatchPreviewsActions).includes(action.type)
	) as Reducer<MatchPreview[], MatchPreviewsAction>,
	awaitingLogin: filterActions(awaitingLoginReducer as Reducer<boolean>, (action) =>
		Object.values(AwaitingLoginActions).includes(action.type)
	) as Reducer<boolean, AwaitingLoginAction>,
	notification: filterActions(notificationReducer as Reducer<FirebaseMessagingTypes.RemoteMessage>, (action) =>
		Object.values(NotificationActions).includes(action.type)
	) as Reducer<FirebaseMessagingTypes.RemoteMessage, NotificationAction>,
});

export default reducer;
