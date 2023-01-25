/* eslint-disable camelcase */
import Stripe from "stripe";

const mapCardSource = ({ id, brand, exp_month, exp_year, last4 }: Stripe.Card): CardPreview => {
	return {
		id,
		brand,
		expiryMonth: exp_month,
		expiryYear: exp_year,
		last4,
	};
};

export default mapCardSource;
