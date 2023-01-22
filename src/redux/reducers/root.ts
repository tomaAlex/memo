import { combineReducers, Reducer } from "redux";
import userReducer from "./user";
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
} from "types/index";

const reducer = combineReducers({
	user: filterActions(userReducer as Reducer<IdentifiedUser>, (action) =>
		Object.values(UserActions).includes(action.type)
	) as Reducer<IdentifiedUser, UserAction>,
	matchPreviews: filterActions(matchPreviewsReducer as Reducer<MatchPreview[]>, (action) =>
		Object.values(MatchPreviewsActions).includes(action.type)
	) as Reducer<MatchPreview[], MatchPreviewsAction>,
	awaitingLogin: filterActions(awaitingLoginReducer as Reducer<boolean>, (action) =>
		Object.values(AwaitingLoginActions).includes(action.type)
	) as Reducer<boolean, AwaitingLoginAction>
});

export default reducer;
