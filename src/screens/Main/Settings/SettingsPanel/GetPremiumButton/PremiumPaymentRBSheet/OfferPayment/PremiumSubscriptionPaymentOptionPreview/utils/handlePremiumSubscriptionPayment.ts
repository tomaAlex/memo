import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import payPremiumSubscription from "./payPremiumSubscription";

const handlePremiumSubscriptionPayment = async (
	cardId: string,
	refRBSheet: React.RefObject<RBSheet>
): Promise<void> => {
	const wasPremiumSuccessfullyPaid = await payPremiumSubscription(cardId);
	if (wasPremiumSuccessfullyPaid) {
		refRBSheet.current?.close();
		return;
	}
};

export default handlePremiumSubscriptionPayment;
