import * as functions from "firebase-functions";
import { getAuthenticatedUserData, getConnectAccount, getUserCustomerStripeId } from "./utils";

export const decideWhetherUserCanCashOut = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const stripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const connectAccount = await getConnectAccount(stripeCustomerId);
	return !!connectAccount.tos_acceptance?.date;
});
