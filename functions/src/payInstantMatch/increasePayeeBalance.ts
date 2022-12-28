import Stripe from "stripe";
import { INSTANT_MATCH_COMMISSION_PERCENTAGE, INSTANT_MATCH_PENCE_PRICE } from "../constants";
import { stripeClient } from "../stripeClient";

const increasePayeeBalance = async (payeeStripeCustomerId: string): Promise<void> => {
	const payeeCustomer = (await stripeClient.customers.retrieve(
		payeeStripeCustomerId
	)) as Stripe.Response<Stripe.Customer>;
	const currentPayeeBalance = payeeCustomer.balance;
	const receivedMoney = INSTANT_MATCH_PENCE_PRICE * (1 - INSTANT_MATCH_COMMISSION_PERCENTAGE);
	const newPayeeBalance = currentPayeeBalance + receivedMoney;
	await stripeClient.customers.update(payeeStripeCustomerId, { balance: newPayeeBalance });
};

export default increasePayeeBalance;
