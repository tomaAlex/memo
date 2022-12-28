import * as functions from "firebase-functions";
import { stripeClient } from "./stripeClient";
import { getAuthenticatedUserData, getUserCustomerStripeId } from "./utils";

export const addPaymentCard = functions.https.onCall(async (data, context) => {
	const token: string = data.token;
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	await stripeClient.customers.createSource(stripeCustomerId, { source: token });
});
