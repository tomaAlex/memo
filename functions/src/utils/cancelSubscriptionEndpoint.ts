import * as functions from "firebase-functions";
import { stripeClient } from "../stripeClient";
import { getFeatureSubscriptions } from "./getFeatureSubscriptions";
import { getAuthenticatedUser } from "./getAuthenticatedUser";
import { getUserCustomerStripeId } from "./getUserCustomerStripeId";
import { getUserData } from "./getUserData";

export const cancelSubscriptionEndpoint = (featureToUnsubscribeFrom: Feature) => {
	return functions.https.onCall(async (data, context) => {
		const authenticatedUser = getAuthenticatedUser(context);
		const authenticatedUserData = await getUserData(authenticatedUser);
		const authenticatedIdentifiedUserData = {
			...authenticatedUserData,
			id: authenticatedUser.id,
		};
		const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
		const featureSubscriptions = await getFeatureSubscriptions(stripeCustomerId);
		const featureSubscriptionToCancel = featureSubscriptions.find(([feature]) => feature === featureToUnsubscribeFrom);
		if (!featureSubscriptionToCancel) {
			return;
		}
		const [featureToCancel, subscriptionToCancel] = featureSubscriptionToCancel;
		await stripeClient.subscriptions.del(subscriptionToCancel.id);
		const { features: outdatedFeatures } = authenticatedUserData;
		const updatedFeatures = outdatedFeatures.filter(({ feature }) => feature !== featureToCancel);
		await authenticatedUser.update({ features: updatedFeatures });
	});
};
