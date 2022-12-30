import { stripeClient } from "../stripeClient";

const cashOutFundsToBankAccount = async (
	bankId: string,
	connectAccountId: string,
	moneyToCashOut: number
): Promise<void> => {
	await stripeClient.transfers.create(
		{
			amount: moneyToCashOut,
			currency: "gbp",
			destination: bankId,
		},
		{ stripeAccount: connectAccountId }
	);
};

export default cashOutFundsToBankAccount;
