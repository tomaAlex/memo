import { auth } from "firebase-admin";
import { stripeClient } from "../../../stripeClient";

const createCustomerStripeAccount = async ({
	id,
	firstName,
	lastName,
	description,
}: IdentifiedUser): Promise<string> => {
	const { email } = await auth().getUser(id);
	const stripeCustomer = await stripeClient.customers.create({
		email,
		name: `${firstName} ${lastName}`,
		description,
	});
	return stripeCustomer.id;
};

export default createCustomerStripeAccount;
