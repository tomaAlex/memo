import { GeneralAction } from "./general";

export enum AwaitingLoginActions {
	SET_AWAIT = "SET_AWAIT",
}

export interface AwaitingLoginAction extends GeneralAction {
	type: AwaitingLoginActions;
	payload: boolean;
}
