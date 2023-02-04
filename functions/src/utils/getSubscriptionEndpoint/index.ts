import * as functions from "firebase-functions";
import { FEATURE_IDS } from "../../constants";
import { stripeClient } from "../../stripeClient";
import { getAuthenticatedUser } from "../getAuthenticatedUser";
import { getUserCustomerStripeId } from "../getUserCustomerStripeId";
import { getUserData } from "../getUserData";
import chargePayer from "./chargePayer";
import getLivedFeature from "./getLivedFeature";
import getUpdateFeatures from "./getUpdateFeatures";

export const getSubscriptionEndpoint = (featureToSubscribeTo: Feature) => {
	return functions.https.onCall(async (data, context) => {
		const cardId: string = data.cardId;
		const authenticatedUser = getAuthenticatedUser(context);
		const authenticatedUserData = await getUserData(authenticatedUser);
		const authenticatedIdentifiedUserData = {
			...authenticatedUserData,
			id: authenticatedUser.id,
		};
		const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
		const featureSubscription = await stripeClient.subscriptions.create({
			customer: stripeCustomerId,
			items: [{ price: FEATURE_IDS[featureToSubscribeTo] }],
			default_source: cardId,
			trial_period_days: 30,
		});
		const wasPaymentSuccessful = await chargePayer(stripeCustomerId, cardId, featureSubscription);
		if (!wasPaymentSuccessful) {
			await stripeClient.subscriptions.del(featureSubscription.id);
			throw new functions.https.HttpsError("failed-precondition", "Payment failed!");
		}
		const updatedLivedFeature = getLivedFeature(featureToSubscribeTo, featureSubscription);
		const currentFeatures = authenticatedUserData.features;
		const updatedFeatures = getUpdateFeatures(currentFeatures, updatedLivedFeature);
		await authenticatedUser.update({ features: updatedFeatures });
	});
};
