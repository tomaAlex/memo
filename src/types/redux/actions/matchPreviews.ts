import { MatchPreview } from "../../Match";
import { GeneralAction } from "./general";

export enum MatchPreviewsActions {
	UPDATE_ALL = "UPDATE_MATCH_PREVIEWS",
}

export interface MatchPreviewsAction extends GeneralAction {
	type: MatchPreviewsActions.UPDATE_ALL;
	payload: MatchPreview[];
}
