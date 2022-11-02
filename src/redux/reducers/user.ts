import {Reducer} from 'redux';
import {UserAction, UserActions, User} from 'types/index';

export type ReducerType = Reducer<User | null, UserAction<User | null>>;

const reducer: ReducerType = (state = null, action): User | null => {
  switch (action.type) {
    case UserActions.LOGIN:
      const justLoggedInUser = action.payload as User;
      return justLoggedInUser;
    case UserActions.UPDATE:
      return {...state, ...action.payload} as User;
    case UserActions.LOGOUT:
      return null;
    default:
      return state;
  }
};

export default reducer;
