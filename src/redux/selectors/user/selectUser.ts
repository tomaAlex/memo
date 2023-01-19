import { createSelector } from "reselect";
import { RootState, IdentifiedUser } from "types/index";

export const selectUser = createSelector(
	(state: RootState): IdentifiedUser => state.user,
	(e) => e
);
