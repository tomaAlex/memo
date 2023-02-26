import { createSelector } from "reselect";
import { RootState } from "types/index";

export const selectIsLiked = (useridToCheck: string) =>
	createSelector(
		({ user: { likes } }: RootState): boolean => {
			return likes.includes(useridToCheck);
		},
		(e) => e
	);
