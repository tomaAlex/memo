import { Feature } from "types/index";
import { createSelector } from "reselect";
import { selectUpdatedFeatures } from "./selectUpdatedFeatures";

export const selectIsPremium = createSelector(selectUpdatedFeatures, (updatedFeatures): boolean => {
	const currentFeatures = updatedFeatures.map(({ feature }) => feature);
	return currentFeatures.includes(Feature.BRONZE);
});
