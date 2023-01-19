import { createSelector } from "reselect";
import { RootState } from "types/index";

export const selectFullName = createSelector(
	({ user: { firstName, lastName } }: RootState): string => `${firstName} ${lastName}`,
	(e) => e
);
