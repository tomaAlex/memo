import { GeneralAction } from "./general";

export enum AdsActions {
	SHOW_GENERIC = "SHOW_GENERIC",
}

export interface AdsAction extends GeneralAction {
	type: AdsActions.SHOW_GENERIC;
	payload: boolean;
}
