import { combineReducers, Reducer } from "redux";
import userReducer from "./user";
import matchPreviewsReducer from "./matchPreviews";
import { filterActions } from "redux-ignore";
import {
	UserAction,
	UserActions,
	IdentifiedUser,
	MatchPreviewsActions,
	MatchPreviewsAction,
	MatchPreview,
} from "types/index";

const reducer = combineReducers({
	user: filterActions(userReducer as Reducer<IdentifiedUser>, (action) =>
		Object.values(UserActions).includes(action.type)
	) as Reducer<IdentifiedUser, UserAction>,
	matchPreviews: filterActions(matchPreviewsReducer as Reducer<MatchPreview[]>, (action) =>
		Object.values(MatchPreviewsActions).includes(action.type)
	) as Reducer<MatchPreview[], MatchPreviewsAction>,
});

export default reducer;
