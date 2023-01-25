import Stripe from "stripe";
import { STRIPE_CUSTOMER_METADATA_KEYS } from "../../constants";
import { stripeClient } from "../../stripeClient";
import createAndSaveConnectAccount from "./createAndSaveConnectAccount";

export const getConnectAccount = async (stripeCustomerId: string): Promise<Stripe.Response<Stripe.Account>> => {
	const stripeCustomer = (await stripeClient.customers.retrieve(stripeCustomerId)) as Stripe.Response<Stripe.Customer>;
	const connectId = stripeCustomer.metadata[STRIPE_CUSTOMER_METADATA_KEYS.CONNECT_ACCOUNT_ID];
	if (connectId) {
		return stripeClient.accounts.retrieve(connectId);
	}
	return createAndSaveConnectAccount(stripeCustomer);
};
