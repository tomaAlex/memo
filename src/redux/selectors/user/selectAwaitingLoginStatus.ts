import { createSelector } from "reselect";
import { RootState } from "types/index";

export const selectAwaitingLoginStatus = createSelector(
	(state: RootState): boolean => state.awaitingLogin,
	(e) => e
);
