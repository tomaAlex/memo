import Stripe from "stripe";
import { stripeClient } from "../../stripeClient";
import determineWhetherSubscriptionIsActive from "./determineWhetherSubscriptionIsActive";
import getFeatureFromId from "./getFeatureFromId";

type FeatureSubscriptions = Array<[Feature, Stripe.Subscription]>;

export const getFeatureSubscriptions = async (stripeCustomerId: string): Promise<FeatureSubscriptions> => {
	const subscriptions = await stripeClient.subscriptions.list({
		customer: stripeCustomerId,
		status: "all",
	});
	const featureSubscriptions = [] as FeatureSubscriptions;
	subscriptions.data.forEach((subscription) => {
		const isSubscriptionActive = determineWhetherSubscriptionIsActive(subscription);
		if (!isSubscriptionActive) {
			return;
		}
		const {
			price: { id: featureId },
		} = subscription.items.data[0];
		featureSubscriptions.push([getFeatureFromId(featureId), subscription]);
	});
	return featureSubscriptions;
};
