import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview } from "types/index";
import handlePremiumSubscriptionPayment from "./utils/handlePremiumSubscriptionPayment";
import { PaymentOptionPreview } from "components/index";

type TProps = CardPreview & {
	refRBSheet: React.RefObject<RBSheet>;
};

const PremiumSubscriptionPaymentOptionPreview = ({ refRBSheet, ...cardPreview }: TProps) => {
	const handlePayment = async (): Promise<void> => {
		await handlePremiumSubscriptionPayment(cardPreview.id, refRBSheet);
	};

	return <PaymentOptionPreview {...{ handlePayment, ...cardPreview }} />;
};

export default React.memo(PremiumSubscriptionPaymentOptionPreview);
