import Stripe from "stripe";
import * as functions from "firebase-functions";
import { stripeClient } from "../stripeClient";
import { getAuthenticatedUserData, getConnectAccount, getUserCustomerStripeId } from "../utils";
import sendFundsToConnectAccount from "./sendFundsToConnectAccount";
import cashOutFundsToBankAccount from "./cashOutFundsToBankAccount";

export const cashOut = functions.https.onCall(async (data, context) => {
	const bankId: string = data.bankId;
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const connectAccount = await getConnectAccount(stripeCustomerId);
	const stripeCustomer = (await stripeClient.customers.retrieve(stripeCustomerId)) as Stripe.Response<Stripe.Customer>;
	const moneyToCashOut = stripeCustomer.balance;
	await sendFundsToConnectAccount(moneyToCashOut, connectAccount.id);
	await cashOutFundsToBankAccount(bankId, connectAccount.id, moneyToCashOut);
});
