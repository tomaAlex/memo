import { Reducer } from "redux";
import { useExpandableRecommendations } from "hooks";
import { ExpandableRecommendationsAction, ExpandableRecommendationsActions } from "types/index";

type ExpandableRecommendationsController = ReturnType<typeof useExpandableRecommendations>;

export type ReducerType = Reducer<ExpandableRecommendationsController, ExpandableRecommendationsAction>;

const reducer: ReducerType = (
	state = [[], () => {}, () => {}],
	{ type, payload }
): ExpandableRecommendationsController => {
	switch (type) {
		case ExpandableRecommendationsActions.SET:
			return payload;
		default:
			return state;
	}
};

export default reducer;
