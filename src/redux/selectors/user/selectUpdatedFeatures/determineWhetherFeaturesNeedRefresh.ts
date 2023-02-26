import { User } from "types/index";
import { firebase } from "@react-native-firebase/firestore";

const determineWhetherFeaturesNeedRefresh = (features: User["features"]): boolean => {
	for (const feature of features) {
		const { expiresAt, checkedForRenewal } = feature;
		const now = firebase.firestore.Timestamp.now();
		const doesFeatureExpire = expiresAt !== null;
		const isFeatureOutdated = doesFeatureExpire && expiresAt < now;
		if (isFeatureOutdated && !checkedForRenewal) {
			return true;
		}
	}
	return false;
};

export default determineWhetherFeaturesNeedRefresh;
