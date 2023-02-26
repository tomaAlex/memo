import { createSelector } from "reselect";
import { RootState } from "types/index";

export const selectLocation = createSelector(
	({ user: { coordinates } }: RootState) => coordinates,
	(e) => e
);
