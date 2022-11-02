import {connect} from 'react-redux';
import {RootState, RequireAtLeastOne, User} from 'types/index';
import generateUserActions from './actions/user';
import store from './store';

const mapState = (state: RootState) => ({
  user: state.user,
});
const mapDispatch = {
  updateUser: (user: RequireAtLeastOne<User>) =>
    generateUserActions.update({...(store.getState().user as User), ...user}),
  login: (user: User) => generateUserActions.login(user),
  logout: () => generateUserActions.logout(),
};
const connector = connect(mapState, mapDispatch);

export default connector;
