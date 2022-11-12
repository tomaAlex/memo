import { MatchPreview, MatchMessage } from "../../Match";
import { GeneralAction } from "./general";

export enum MatchPreviewsActions {
	UPDATE_ALL = "UPDATE_MATCH_PREVIEWS",
	UPDATE_MATCH_PREVIEW_LAST_MESSAGE = "UPDATE_MATCH_PREVIEW_LAST_MESSAGE",
}

export type MatchLastMessageUpdatePayload = {
	id: MatchPreview["id"];
	newLastMessage: MatchMessage;
};

export type MatchPreviewsPayload = MatchPreview[] | MatchLastMessageUpdatePayload;

export interface MatchPreviewsAction<Payload extends MatchPreviewsPayload> extends GeneralAction {
	type: Payload extends MatchPreview[]
		? MatchPreviewsActions.UPDATE_ALL
		: MatchPreviewsActions.UPDATE_MATCH_PREVIEW_LAST_MESSAGE;
	payload: Payload;
}
