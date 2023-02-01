import { connect } from "react-redux";
import { RootState, RequireAtLeastOne, IdentifiedUser, MatchPreview } from "types/index";
import generateAwaitingLoginActions from "./actions/awaitingLogin";
import generateMatchPreviewsActions from "./actions/matchPreviews";
import generateUserActions from "./actions/user";
import generateNotificationActions from "./actions/notification";
import store from "./store";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

const mapState = (state: RootState) => ({
	user: state.user,
	matchPreviews: state.matchPreviews,
	awaitingLogin: state.awaitingLogin,
	notification: state.notification,
});
const mapDispatch = {
	updateUser: (user: RequireAtLeastOne<IdentifiedUser>) =>
		generateUserActions.update({ ...(store.getState().user as IdentifiedUser), ...user }),
	logoutUser: () => generateUserActions.logout(),
	updateAllMatchPreviews: (matchPreviews: MatchPreview[]) => generateMatchPreviewsActions.updateAll(matchPreviews),
	setAwaitingLoginStatus: (awaitingLoginStatus: boolean) => generateAwaitingLoginActions.set(awaitingLoginStatus),
	addNotification: (notification: FirebaseMessagingTypes.RemoteMessage) =>
		generateNotificationActions.add(notification),
	clearNotification: () => generateNotificationActions.clear(),
};
const connector = connect(mapState, mapDispatch);

export default connector;
