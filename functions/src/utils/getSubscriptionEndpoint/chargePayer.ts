import { FEATURE_PENCE_PRICES } from "../../constants";
import { stripeClient } from "../../stripeClient";

const chargePayer = async (payerStripeCustomerId: string, cardId: string, featureToBuy: Feature): Promise<boolean> => {
	const chargeResponse = await stripeClient.charges.create({
		amount: FEATURE_PENCE_PRICES[featureToBuy],
		currency: "gbp",
		customer: payerStripeCustomerId,
		description: `${featureToBuy} subscription 🏆`,
		source: cardId,
	});
	return chargeResponse.paid;
};

export default chargePayer;
