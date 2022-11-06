import { connect } from "react-redux";
import { RootState, RequireAtLeastOne, IdentifiedUser } from "types/index";
import generateUserActions from "./actions/user";
import store from "./store";

const mapState = (state: RootState) => ({
	user: state.user,
});
const mapDispatch = {
	updateUser: (user: RequireAtLeastOne<IdentifiedUser>) =>
		generateUserActions.update({ ...(store.getState().user as IdentifiedUser), ...user }),
};
const connector = connect(mapState, mapDispatch);

export default connector;
