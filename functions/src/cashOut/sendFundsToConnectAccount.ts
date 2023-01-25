import { stripeClient } from "../stripeClient";

const sendFundsToConnectAccount = async (moneyToAdd: number, connectAccountId: string): Promise<void> => {
	await stripeClient.transfers.create({
		amount: moneyToAdd,
		currency: "gbp",
		destination: connectAccountId,
	});
};

export default sendFundsToConnectAccount;
