import { Reducer } from "redux";
import { UserAction, UserActions, IdentifiedUser } from "types/index";

export type ReducerType = Reducer<IdentifiedUser | null, UserAction<IdentifiedUser | null>>;

const reducer: ReducerType = (state = null, action): IdentifiedUser | null => {
	switch (action.type) {
		case UserActions.UPDATE:
			return { ...state, ...action.payload } as IdentifiedUser;
		default:
			return state;
	}
};

export default reducer;
