import {combineReducers, Reducer} from 'redux';
import userReducer from './user';
import {filterActions} from 'redux-ignore';
import {UserAction, UserActions, User} from 'types/index';

const reducer = combineReducers({
  user: filterActions(userReducer as Reducer<User>, action =>
    Object.values(UserActions).includes(action.type),
  ) as Reducer<User, UserAction>,
});

export default reducer;
