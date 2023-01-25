import * as functions from "firebase-functions";
import { getAuthenticatedUserData, getUserCustomerStripeId } from "../utils";
import chargePayer from "./chargePayer";
import createInstantMatch from "./createInstantMatch";
import getPayeeStripeCustomerId from "./getPayeeStripeCustomerId";
import increasePayeeBalance from "./increasePayeeBalance";

export const payInstantMatch = functions.https.onCall(async (data, context) => {
	const userToInstantlyMatchId: string = data.userToInstantlyMatchId;
	const cardId: string = data.cardId;

	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const payerStripeCustomerId = await getUserCustomerStripeId(authenticatedIdentifiedUserData);
	const wasPaymentSuccessful = await chargePayer(payerStripeCustomerId, cardId);

	if (!wasPaymentSuccessful) {
		return false;
	}

	const payeeStripeCustomerId = await getPayeeStripeCustomerId(userToInstantlyMatchId);
	await increasePayeeBalance(payeeStripeCustomerId);

	await createInstantMatch(authenticatedIdentifiedUserData.id, userToInstantlyMatchId);
	return true;
});
