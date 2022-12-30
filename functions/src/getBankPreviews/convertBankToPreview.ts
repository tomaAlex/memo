/* eslint-disable camelcase */
import Stripe from "stripe";

const convertBankToPreview = ({ id, country, last4, routing_number }: Stripe.BankAccount): BankPreview => {
	return {
		id,
		country,
		last4,
		routingNumber: routing_number ?? undefined,
	};
};

export default convertBankToPreview;
