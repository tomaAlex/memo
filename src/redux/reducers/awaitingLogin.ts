import { Reducer } from "redux";
import { AwaitingLoginAction, AwaitingLoginActions } from "types/index";

export type ReducerType = Reducer<boolean, AwaitingLoginAction>;

const reducer: ReducerType = (state = false, { type, payload }): boolean => {
	switch (type) {
		case AwaitingLoginActions.SET_AWAIT:
			return payload;
		default:
			return state;
	}
};

export default reducer;
