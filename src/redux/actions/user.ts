import { ActionCreator } from "redux";
import { UserAction, UserActions, User } from "types/index";

const updateAction: ActionCreator<UserAction> = (updatedUser: User) => ({
	type: UserActions.UPDATE,
	payload: updatedUser,
});

const logoutAction: ActionCreator<UserAction<null>> = () => ({
	type: UserActions.LOGOUT,
	payload: null,
});

const generateUserActions = {
	update: updateAction,
	logout: logoutAction,
};

export default generateUserActions;
