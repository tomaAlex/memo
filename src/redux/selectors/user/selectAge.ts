import { RootState } from "types/index";
import { createSelector } from "reselect";
import { getAgeFromBirthDate } from "utils/index";

export const selectAge = createSelector(
	({ user: { birthDate } }: RootState): number => {
		return getAgeFromBirthDate(birthDate);
	},
	(e) => e
);
