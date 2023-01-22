import { Reducer } from "redux";
import { UserAction, UserActions, IdentifiedUser } from "types/index";

export type ReducerType = Reducer<IdentifiedUser | null, UserAction<IdentifiedUser | null>>;

const reducer: ReducerType = (state = null, { type, payload }): IdentifiedUser | null => {
	switch (type) {
		case UserActions.UPDATE:
			return { ...state, ...payload } as IdentifiedUser;
		case UserActions.LOGOUT:
			return null;
		default:
			return state;
	}
};

export default reducer;
