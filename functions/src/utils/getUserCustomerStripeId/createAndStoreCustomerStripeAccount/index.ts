import associateStripeCustomerId from "./associateStripeCustomerId";
import createCustomerStripeAccount from "./createCustomerStripeAccount";

const createAndStoreCustomerStripeAccount = async (
	userToCreateCustomerStripeAccountFor: IdentifiedUser
): Promise<string> => {
	const stripeCustomerId = await createCustomerStripeAccount(userToCreateCustomerStripeAccountFor);
	await associateStripeCustomerId(userToCreateCustomerStripeAccountFor.id, stripeCustomerId);
	return stripeCustomerId;
};

export default createAndStoreCustomerStripeAccount;
