import { ActionCreator } from "redux";
import { MatchPreviewsAction, MatchPreview, MatchPreviewsActions, MatchLastMessageUpdatePayload } from "types/index";

const updateAllAction: ActionCreator<MatchPreviewsAction<MatchPreview[]>> = (updatedMatchPreviews: MatchPreview[]) => ({
	type: MatchPreviewsActions.UPDATE_ALL,
	payload: updatedMatchPreviews,
});

const updateMatchPreviewLastMessageAction: ActionCreator<MatchPreviewsAction<MatchLastMessageUpdatePayload>> = (
	matchLastMessageUpdate: MatchLastMessageUpdatePayload
) => ({
	type: MatchPreviewsActions.UPDATE_MATCH_PREVIEW_LAST_MESSAGE,
	payload: matchLastMessageUpdate,
});

const generateMatchPreviewsActions = {
	updateAll: updateAllAction,
	updateMatchPreviewLastMessage: updateMatchPreviewLastMessageAction,
};

export default generateMatchPreviewsActions;
