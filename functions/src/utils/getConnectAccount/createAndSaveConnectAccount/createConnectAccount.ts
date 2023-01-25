import Stripe from "stripe";
import { stripeClient } from "../../../stripeClient";

const createConnectAccount = async (
	stripeCustomer: Stripe.Response<Stripe.Customer>
): Promise<Stripe.Response<Stripe.Account>> => {
	const email = stripeCustomer.email ? stripeCustomer.email : undefined;
	return stripeClient.accounts.create({
		type: "custom",
		business_type: "individual",
		capabilities: {
			card_payments: {
				requested: true,
			},
			transfers: {
				requested: true,
			},
			bank_transfer_payments: {
				requested: true,
			},
		},
		email,
	});
};

export default createConnectAccount;
