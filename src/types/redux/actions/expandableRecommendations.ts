import { GeneralAction } from "./general";
import { useExpandableRecommendations } from "hooks";

export enum ExpandableRecommendationsActions {
	SET = "SET_EXPANDABLE_RECOMMENDATIONS",
}

export interface ExpandableRecommendationsAction extends GeneralAction {
	type: ExpandableRecommendationsActions;
	payload: ReturnType<typeof useExpandableRecommendations>;
}
