import { createSelector } from "reselect";
import { RootState } from "types/index";

export const selectAge = createSelector(
	({ user: { birthDate } }: RootState): number => {
		const millisecondsAge = Date.now() - new Date(birthDate).getTime();
		const ageDate = new Date(millisecondsAge);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	},
	(e) => e
);
