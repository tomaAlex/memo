import { User } from "types/index";
import determineWhetherFeatureIsOutdated from "./determineWhetherFeatureIsOutdated";

const determineWhetherFeaturesNeedRefresh = (features: User["features"]): boolean => {
	for (const feature of features) {
		const { checkedForRenewal } = feature;
		const isFeatureOutdated = determineWhetherFeatureIsOutdated(feature);
		if (isFeatureOutdated && !checkedForRenewal) {
			return true;
		}
	}
	return false;
};

export default determineWhetherFeaturesNeedRefresh;
