// import { Feature } from "types/index";
import { createSelector } from "reselect";
import { selectUpdatedFeatures } from "./selectUpdatedFeatures";

/**
 * Select whether the user has a premium subscription.
 * @returns Only true for now. TODO: Implement in-app purchases.
 */
export const selectIsPremium = createSelector(selectUpdatedFeatures, (updatedFeatures): boolean => {
	// const currentFeatures = updatedFeatures.map(({ feature }) => feature);
	// return currentFeatures.includes(Feature.BRONZE);
	console.warn("ignoring", { updatedFeatures });
	return true;
});
