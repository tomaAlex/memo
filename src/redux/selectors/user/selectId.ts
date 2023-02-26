import { createSelector } from "reselect";
import { RootState } from "types/index";

export const selectId = createSelector(
	({ user: { id } }: RootState) => id,
	(e) => e
);
