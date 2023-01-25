import Stripe from "stripe";
import * as functions from "firebase-functions";
import { stripeClient } from "./stripeClient";
import { getAuthenticatedUserData, getUserCustomerStripeId } from "./utils";

export const getBalance = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const stripeCustomer = (await stripeClient.customers.retrieve(stripeCustomerId)) as Stripe.Response<Stripe.Customer>;
	// in Stripe, a positive balance of customer represents how much money they owe to us
	// and a negative balance of customer represents how much money we owe to them,
	// so we need to multiply the balance by -1 to get the correct balance
	return -1 * stripeCustomer.balance;
});
