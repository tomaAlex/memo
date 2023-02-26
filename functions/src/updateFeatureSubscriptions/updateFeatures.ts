import Stripe from "stripe";
import { firestore } from "firebase-admin";

const updateFeatures = (
	currentFeatures: User["features"],
	updatedFeatureSubscriptions: Array<[Feature, Stripe.Subscription]>
): User["features"] => {
	const now = firestore.Timestamp.now();
	return currentFeatures.map((currentFeature) => {
		const { expiresAt, checkedForRenewal, feature } = currentFeature;
		const doesNotExpire = expiresAt === null;
		const isFeatureOutdated = !doesNotExpire && expiresAt < now;
		if (!isFeatureOutdated || checkedForRenewal) {
			return currentFeature;
		}
		const updatedFeatureSubscription = updatedFeatureSubscriptions.find(
			([updatedFeature]) => updatedFeature === feature
		);
		if (!updatedFeatureSubscription) {
			return { ...currentFeature, checkedForRenewal: true };
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, newFeatureSubscription] = updatedFeatureSubscription;
		const newFeatureExpiration = firestore.Timestamp.fromMillis(newFeatureSubscription.current_period_end * 1000);
		const isFeatureStillOutdated = newFeatureExpiration < now;
		if (isFeatureStillOutdated) {
			return { ...currentFeature, checkedForRenewal: true };
		}
		return { ...currentFeature, expiresAt: newFeatureExpiration };
	});
};

export default updateFeatures;
