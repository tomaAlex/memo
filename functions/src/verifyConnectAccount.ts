import * as functions from "firebase-functions";
import { stripeClient } from "./stripeClient";
import { getAuthenticatedUserData, getConnectAccount, getUserCustomerStripeId } from "./utils";

export const verifyConnectAccount = functions.https.onCall(async (data, context) => {
	const acceptedTOS = data.acceptedTOS as boolean;
	if (!acceptedTOS) {
		return;
	}
	const businessMcc = data.businessMcc as string;
	const businessWebsite = data.businessWebsite as string;
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const connectAccount = await getConnectAccount(stripeCustomerId);
	await stripeClient.accounts.update(connectAccount.id, {
		tos_acceptance: {
			date: Math.floor(Date.now() / 1000),
			ip: context.rawRequest.ip,
		},
		business_profile: {
			mcc: businessMcc,
			support_url: businessWebsite,
		},
	});
});
