import * as functions from "firebase-functions";
import { stripeClient } from "./stripeClient";
import { getAuthenticatedUserData, getConnectAccount, getUserCustomerStripeId } from "./utils";

export const addCashOutBankAccount = functions.https.onCall(async (data, context) => {
	const token: string = data.token;
	console.log("addCashOutBankAccount", token);
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	console.log({ stripeCustomerId });
	const connectAccount = await getConnectAccount(stripeCustomerId);
	console.log({ connectAccount: connectAccount.id });
	const bankAccountResponse = await stripeClient.accounts.createExternalAccount(connectAccount.id, {
		external_account: token,
	});
	console.log({ bankAccountResponse: bankAccountResponse.id });
});
