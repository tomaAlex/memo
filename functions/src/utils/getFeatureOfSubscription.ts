import Stripe from "stripe";
import { getFeatureSubscriptions } from "./getFeatureSubscriptions";

export const getFeatureOfSubscription = async (
	stripeCustomerId: string,
	subscription: Stripe.Subscription
): Promise<Feature> => {
	const featureSubscriptions = await getFeatureSubscriptions(stripeCustomerId);
	const [featureOfSubscription] = featureSubscriptions.find(
		([, subscriptionOfFeature]) => subscriptionOfFeature.id === subscription.id
	) as [Feature, Stripe.Subscription];
	return featureOfSubscription;
};
