import { INSTANT_MATCH_PENCE_PRICE } from "../constants";
import { stripeClient } from "../stripeClient";

const chargePayer = async (payerStripeCustomerId: string, cardId: string): Promise<boolean> => {
	const chargeResponse = await stripeClient.charges.create({
		amount: INSTANT_MATCH_PENCE_PRICE,
		currency: "gbp",
		customer: payerStripeCustomerId,
		description: "Instant Match 🔥",
		source: cardId,
	});
	return chargeResponse.paid;
};

export default chargePayer;
