import Stripe from "stripe";
import * as functions from "firebase-functions";
import { stripeClient } from "../stripeClient";
import { getAuthenticatedUserData, getConnectAccount, getUserCustomerStripeId } from "../utils";
import convertBankToPreview from "./convertBankToPreview";

export const getBankPreviews = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const connectAccount = await getConnectAccount(stripeCustomerId);
	const bankAccounts = (await stripeClient.accounts.listExternalAccounts(connectAccount.id, {
		object: "bank_account",
	})) as Stripe.Response<Stripe.ApiList<Stripe.BankAccount>>;
	return bankAccounts.data.map(convertBankToPreview);
});
