import createAndStoreCustomerStripeAccount from "./createAndStoreCustomerStripeAccount";

export const getUserCustomerStripeId = async (userToGetStripeIdFor: IdentifiedUser): Promise<string> => {
	const { stripeId } = userToGetStripeIdFor;
	if (stripeId) {
		return stripeId;
	}
	return createAndStoreCustomerStripeAccount(userToGetStripeIdFor);
};
