import { useExpandableRecommendations } from "hooks";
import { ActionCreator } from "redux";
import { ExpandableRecommendationsAction, ExpandableRecommendationsActions } from "types/index";

const setAction: ActionCreator<ExpandableRecommendationsAction> = (
	expandableRecommendations: ReturnType<typeof useExpandableRecommendations>
) => ({
	type: ExpandableRecommendationsActions.SET,
	payload: expandableRecommendations,
});

const generateExpandableRecommendationsActions = {
	set: setAction,
};

export default generateExpandableRecommendationsActions;
