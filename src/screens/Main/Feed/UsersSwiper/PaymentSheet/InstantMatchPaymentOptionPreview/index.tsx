import React, { useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview } from "types/index";
import UsersSwiperContext from "../../UsersSwiperContext";
import handleInstantMatchPayment from "./utils/handleInstantMatchPayment";
import { PaymentOptionPreview } from "components/index";

type TProps = CardPreview & {
	refRBSheet: React.RefObject<RBSheet>;
	setWasBottomSheetPrematurelyClosed: (wasBottomSheetPrematurelyClosed: boolean) => void;
};

const InstantMatchPaymentOptionPreview = ({
	refRBSheet,
	setWasBottomSheetPrematurelyClosed,
	...cardPreview
}: TProps) => {
	const { swiperReference, setIsSwiperBlocked, userToInstantlyMatchId } = useContext(UsersSwiperContext);

	const handlePayment = async (): Promise<void> => {
		await handleInstantMatchPayment(
			userToInstantlyMatchId,
			cardPreview.id,
			refRBSheet,
			setIsSwiperBlocked,
			swiperReference,
			setWasBottomSheetPrematurelyClosed
		);
	};

	return <PaymentOptionPreview {...{ handlePayment, ...cardPreview }} />;
};

export default React.memo(InstantMatchPaymentOptionPreview);
