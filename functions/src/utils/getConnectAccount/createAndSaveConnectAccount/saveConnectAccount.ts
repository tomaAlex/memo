import Stripe from "stripe";
import { STRIPE_CUSTOMER_METADATA_KEYS } from "../../../constants";
import { stripeClient } from "../../../stripeClient";

const saveConnectAccount = async (
	stripeCustomer: Stripe.Response<Stripe.Customer>,
	connectAccount: Stripe.Response<Stripe.Account>
): Promise<void> => {
	await stripeClient.customers.update(stripeCustomer.id, {
		metadata: {
			[STRIPE_CUSTOMER_METADATA_KEYS.CONNECT_ACCOUNT_ID]: connectAccount.id,
		},
	});
};

export default saveConnectAccount;
