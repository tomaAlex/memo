import Stripe from "stripe";
import { stripeClient } from "../../stripeClient";
import { getFeatureOfSubscription } from "../getFeatureOfSubscription";

const chargePayer = async (
	payerStripeCustomerId: string,
	cardId: string,
	boughtFeatureSubscription: Stripe.Response<Stripe.Subscription>
): Promise<boolean> => {
	const boughtFeature = await getFeatureOfSubscription(payerStripeCustomerId, boughtFeatureSubscription);
	const chargeResponse = await stripeClient.charges.create({
		amount: boughtFeatureSubscription.items.data[0].price.unit_amount as number,
		currency: "gbp",
		customer: payerStripeCustomerId,
		description: `${boughtFeature} subscription 🏆`,
		source: cardId,
	});
	return chargeResponse.paid;
};

export default chargePayer;
