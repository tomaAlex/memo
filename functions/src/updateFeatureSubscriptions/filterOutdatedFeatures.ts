import { firestore } from "firebase-admin";

const filterOutdatedFeatures = (features: User["features"]): User["features"] => {
	const now = firestore.Timestamp.now();
	return features.filter((feature) => {
		return feature.expiresAt > now;
	});
};

export default filterOutdatedFeatures;
