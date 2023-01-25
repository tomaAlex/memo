import * as functions from "firebase-functions";
import { getAuthenticatedUserData } from "../utils";
import getCustomerCardSources from "./getCustomerCardSources";
import mapCardSource from "./mapCardSource";

export const getCardPreviews = functions.https.onCall(async (data, context) => {
	const authenticatedIdentifiedUserData = await getAuthenticatedUserData(context);
	const { stripeId } = authenticatedIdentifiedUserData;
	if (!stripeId) {
		return [];
	}
	const customerCardSources = await getCustomerCardSources(stripeId);
	return customerCardSources.map(mapCardSource);
});
