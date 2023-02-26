import { createSelector } from "reselect";
import { RootState } from "types/index";

export const selectSearchFilters = createSelector(
	({ user: { searchFilters } }: RootState) => searchFilters,
	(e) => e
);
