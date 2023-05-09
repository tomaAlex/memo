import { combineReducers, Reducer } from "redux";
import userReducer from "./user";
import notificationReducer from "./notification";
import matchPreviewsReducer from "./matchPreviews";
import awaitingLoginReducer from "./awaitingLogin";
import expandableRecommendationsReducer from "./expandableRecommendations";
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
	ExpandableRecommendationsAction,
	ExpandableRecommendationsActions,
} from "types/index";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { useExpandableRecommendations } from "hooks";

type ExpandableRecommendationsController = ReturnType<typeof useExpandableRecommendations>;

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
	expandableRecommendations: filterActions(
		expandableRecommendationsReducer as Reducer<ExpandableRecommendationsController>,
		(action) => Object.values(ExpandableRecommendationsActions).includes(action.type)
	) as Reducer<ExpandableRecommendationsController, ExpandableRecommendationsAction>,
});

export default reducer;
