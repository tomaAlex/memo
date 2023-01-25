import { Reducer } from "redux";
import { MatchPreview, MatchPreviewsAction, MatchPreviewsActions } from "types/index";

export type ReducerType = Reducer<MatchPreview[] | null, MatchPreviewsAction>;

const reducer: ReducerType = (state = null, action): MatchPreview[] => {
	if (state === null) {
		return [];
	}
	const { type, payload } = action;
	switch (type) {
		case MatchPreviewsActions.UPDATE_ALL:
			return payload as MatchPreview[];

		default:
			return state;
	}
};

export default reducer;
