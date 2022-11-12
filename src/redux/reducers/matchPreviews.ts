import { Reducer } from "redux";
import {
	MatchLastMessageUpdatePayload,
	MatchPreview,
	MatchPreviewsAction,
	MatchPreviewsActions,
	MatchPreviewsPayload,
} from "types/index";

export type ReducerType = Reducer<MatchPreview[] | null, MatchPreviewsAction<MatchPreviewsPayload>>;

const reducer: ReducerType = (state = null, action): MatchPreview[] => {
	if (state === null) {
		return [];
	}
	const { type, payload } = action;
	switch (type) {
		case MatchPreviewsActions.UPDATE_ALL:
			return payload as MatchPreview[];

		case MatchPreviewsActions.UPDATE_MATCH_PREVIEW_LAST_MESSAGE:
			const currentMatchPreviews = [...state] as MatchPreview[];
			const matchLastMessageUpdatePayload = payload as MatchLastMessageUpdatePayload;
			return currentMatchPreviews.map((currentMatchPreview) => {
				const isTheMatchPreviewToUpdate = currentMatchPreview.id === matchLastMessageUpdatePayload.id;
				const updatedMatchPreview: MatchPreview = {
					...currentMatchPreview,
					lastMessage: isTheMatchPreviewToUpdate
						? matchLastMessageUpdatePayload.newLastMessage
						: currentMatchPreview.lastMessage,
				};
				return updatedMatchPreview;
			});

		default:
			return state;
	}
};

export default reducer;
