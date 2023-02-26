import { createSelector } from "reselect";
import { RootState, User } from "types/index";
import determineWhetherFeatureIsOutdated from "./determineWhetherFeatureIsOutdated";
import determineWhetherFeaturesNeedRefresh from "./determineWhetherFeaturesNeedRefresh";
import refreshFeatures from "./refreshFeatures";

export const selectUpdatedFeatures = createSelector(
	({ user: { features: possiblyOutdatedFeatures } }: RootState): User["features"] => {
		const doFeaturesNeedRefresh = determineWhetherFeaturesNeedRefresh(possiblyOutdatedFeatures);
		if (doFeaturesNeedRefresh) {
			refreshFeatures(); // no need to await
		}
		return possiblyOutdatedFeatures.filter(
			(possiblyOutdatedFeature) => !determineWhetherFeatureIsOutdated(possiblyOutdatedFeature)
		);
	},
	(e) => e
);
