import { LivedFeature, LivedFeatureExpiration } from "types/index";
import { firebase } from "@react-native-firebase/firestore";

const determineWhetherFeatureIsOutdated = (possiblyOutdatedFeature: LivedFeature<LivedFeatureExpiration>) => {
	const { expiresAt } = possiblyOutdatedFeature;
	const now = firebase.firestore.Timestamp.now();
	const doesFeatureExpire = expiresAt !== null;
	return doesFeatureExpire && expiresAt < now;
};

export default determineWhetherFeatureIsOutdated;
