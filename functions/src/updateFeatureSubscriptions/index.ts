import * as functions from "firebase-functions";
import { getAuthenticatedUser, getFeatureSubscriptions, getUserCustomerStripeId, getUserData } from "../utils";
import updateFeatures from "./updateFeatures";

export const updateFeatureSubscriptions = functions.https.onCall(async (data, context) => {
	const authenticatedUser = getAuthenticatedUser(context);
	const authenticatedUserData = await getUserData(authenticatedUser);
	const authenticatedIdentifiedUserData = { ...authenticatedUserData, id: authenticatedUser.id };
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const updatedFeatureSubscriptions = await getFeatureSubscriptions(stripeCustomerId);
	const updatedFeatures = updateFeatures(authenticatedUserData.features, updatedFeatureSubscriptions);
	await authenticatedUser.update({ features: updatedFeatures });
});
