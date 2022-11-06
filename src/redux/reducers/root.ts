import { combineReducers, Reducer } from "redux";
import userReducer from "./user";
import { filterActions } from "redux-ignore";
import { UserAction, UserActions, IdentifiedUser } from "types/index";

const reducer = combineReducers({
	user: filterActions(userReducer as Reducer<IdentifiedUser>, (action) =>
		Object.values(UserActions).includes(action.type)
	) as Reducer<IdentifiedUser, UserAction>,
});

export default reducer;
