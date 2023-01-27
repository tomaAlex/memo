import { firestore } from "firebase-admin";
import Stripe from "stripe";

const getLivedFeature = (
	feature: Feature,
	featureSubscription: Stripe.Response<Stripe.Subscription>
): LivedFeature<firestore.Timestamp> => {
	return {
		feature,
		expiresAt: firestore.Timestamp.fromMillis(featureSubscription.current_period_end * 1000),
		checkedForRenewal: false,
	};
};

export default getLivedFeature;
