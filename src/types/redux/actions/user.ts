import { User } from "../../User";
import { GeneralAction } from "./general";

export enum UserActions {
	UPDATE = "UPDATE_USER",
}

export interface UserAction<T = User> extends GeneralAction {
	type: UserActions;
	payload: T;
}
