import Stripe from "stripe";
import * as functions from "firebase-functions";
import { stripeClient } from "./stripeClient";
import { getAuthenticatedUserData, getUserCustomerStripeId } from "./utils";

export const getBalance = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const stripeCustomer = (await stripeClient.customers.retrieve(stripeCustomerId)) as Stripe.Response<Stripe.Customer>;
	return stripeCustomer.balance;
});
