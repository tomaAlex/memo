import { ActionCreator } from "redux";
import { AwaitingLoginAction, AwaitingLoginActions } from "types/index";

const setAction: ActionCreator<AwaitingLoginAction> = (awaitingLoginStatus: boolean) => ({
	type: AwaitingLoginActions.SET_AWAIT,
	payload: awaitingLoginStatus,
});

const generateAwaitingLoginActions = {
	set: setAction,
};

export default generateAwaitingLoginActions;
