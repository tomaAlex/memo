import Stripe from "stripe";
import { stripeClient } from "../stripeClient";

const getCustomerCardSources = async (customerId: string): Promise<Stripe.Card[]> => {
	const customerSourcesData = await stripeClient.customers.listSources(customerId, { object: "card" });
	return customerSourcesData.data as Stripe.Card[];
};

export default getCustomerCardSources;
