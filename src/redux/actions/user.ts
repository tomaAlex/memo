import {ActionCreator} from 'redux';
import {UserAction, UserActions, User} from 'types/index';

const loginAction: ActionCreator<UserAction> = (userToLogin: User) => ({
  type: UserActions.LOGIN,
  payload: userToLogin,
});

const logoutAction: ActionCreator<UserAction<null>> = () => ({
  type: UserActions.LOGOUT,
  payload: null,
});

const updateAction: ActionCreator<UserAction> = (updatedUser: User) => ({
  type: UserActions.UPDATE,
  payload: updatedUser,
});

const generateUserActions = {
  login: loginAction,
  logout: logoutAction,
  update: updateAction,
};

export default generateUserActions;
