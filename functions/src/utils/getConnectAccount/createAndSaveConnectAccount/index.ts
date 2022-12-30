import Stripe from "stripe";
import createConnectAccount from "./createConnectAccount";
import saveConnectAccount from "./saveConnectAccount";

const createAndSaveConnectAccount = async (
	stripeCustomer: Stripe.Response<Stripe.Customer>
): Promise<Stripe.Response<Stripe.Account>> => {
	const connectAccount = await createConnectAccount(stripeCustomer);
	await saveConnectAccount(stripeCustomer, connectAccount);
	return connectAccount;
};

export default createAndSaveConnectAccount;
