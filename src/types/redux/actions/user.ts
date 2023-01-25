import { User } from "../../User";
import { XOR } from "../../XOR";
import { GeneralAction } from "./general";

export enum UserActions {
	UPDATE = "UPDATE_USER",
	LOGOUT = "LOGOUT_USER",
}

export interface UserAction<T extends XOR<User, null> = User> extends GeneralAction {
	type: UserActions;
	payload: T;
}
