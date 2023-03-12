import { stripeClient } from "../stripeClient";
import { getConnectAccount, getUserCustomerStripeId } from "../utils";

/**
 * Removes the Stripe account for the given user (this deletes both the Stripe customer
 * and the Stripe connect account).
 * @param {IdentifiedUser} userToHaveStripeAccountRemoved The user to have their Stripe account removed.
 */
const deleteStripeAccount = async (userToHaveStripeAccountRemoved: IdentifiedUser): Promise<void> => {
	const stripeCustomerId = await getUserCustomerStripeId(userToHaveStripeAccountRemoved);
	const connectAccount = await getConnectAccount(stripeCustomerId);
	await stripeClient.accounts.del(connectAccount.id);
	await stripeClient.customers.del(stripeCustomerId);
};

export default deleteStripeAccount;
