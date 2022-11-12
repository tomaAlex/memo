import { connect } from "react-redux";
import { RootState, RequireAtLeastOne, IdentifiedUser, MatchPreview, MatchLastMessageUpdatePayload } from "types/index";
import generateMatchPreviewsActions from "./actions/matchPreviews";
import generateUserActions from "./actions/user";
import store from "./store";

const mapState = (state: RootState) => ({
	user: state.user,
	matchPreviews: state.matchPreviews,
});
const mapDispatch = {
	updateUser: (user: RequireAtLeastOne<IdentifiedUser>) =>
		generateUserActions.update({ ...(store.getState().user as IdentifiedUser), ...user }),
	updateAllMatchPreviews: (matchPreviews: MatchPreview[]) => generateMatchPreviewsActions.updateAll(matchPreviews),
	updateMatchPreviewLastMessage: (matchLastMessageUpdate: MatchLastMessageUpdatePayload) =>
		generateMatchPreviewsActions.updateMatchPreviewLastMessage(matchLastMessageUpdate),
};
const connector = connect(mapState, mapDispatch);

export default connector;
