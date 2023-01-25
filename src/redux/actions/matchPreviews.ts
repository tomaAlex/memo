import { ActionCreator } from "redux";
import { MatchPreviewsAction, MatchPreview, MatchPreviewsActions } from "types/index";

const updateAllAction: ActionCreator<MatchPreviewsAction> = (updatedMatchPreviews: MatchPreview[]) => ({
	type: MatchPreviewsActions.UPDATE_ALL,
	payload: updatedMatchPreviews,
});

const generateMatchPreviewsActions = {
	updateAll: updateAllAction,
};

export default generateMatchPreviewsActions;
