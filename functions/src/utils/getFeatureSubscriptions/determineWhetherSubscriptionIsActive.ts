import Stripe from "stripe";

const determineWhetherSubscriptionIsActive = (subscription: Stripe.Subscription): boolean => {
	const activeSubscriptionStates = ["incomplete", "trialing", "active"] as Stripe.Subscription.Status[];
	return activeSubscriptionStates.includes(subscription.status);
};

export default determineWhetherSubscriptionIsActive;
