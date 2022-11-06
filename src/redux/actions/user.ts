import { ActionCreator } from "redux";
import { UserAction, UserActions, User } from "types/index";

const updateAction: ActionCreator<UserAction> = (updatedUser: User) => ({
	type: UserActions.UPDATE,
	payload: updatedUser,
});

const generateUserActions = {
	update: updateAction,
};

export default generateUserActions;
