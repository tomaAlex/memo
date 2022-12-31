import { stripeClient } from "../stripeClient";

const resetCustomerBalance = async (stripeCustomerId: string): Promise<void> => {
	await stripeClient.customers.update(stripeCustomerId, { balance: 0 });
};

export default resetCustomerBalance;
