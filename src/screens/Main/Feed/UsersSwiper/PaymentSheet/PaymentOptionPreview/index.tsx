import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview, IdentifiedUser } from "types/index";
import handleInstantMatchPayment from "./utils/handleInstantMatchPayment";

type TProps = CardPreview & {
	refRBSheet: React.RefObject<RBSheet>;
	userToInstantlyMatchId: string;
	setIsSwiperBlocked: (isSwiperBlocked: boolean) => void;
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
	setWasBottomSheetPrematurelyClosed: (wasBottomSheetPrematurelyClosed: boolean) => void;
};

const PaymentOptionPreview = ({
	id,
	brand,
	last4,
	refRBSheet,
	userToInstantlyMatchId,
	setIsSwiperBlocked,
	swiperReference,
	setWasBottomSheetPrematurelyClosed,
}: TProps) => {
	const fireInstantMatchPaymentRoutine = () => {
		handleInstantMatchPayment(
			userToInstantlyMatchId,
			id,
			refRBSheet,
			setIsSwiperBlocked,
			swiperReference,
			setWasBottomSheetPrematurelyClosed
		);
	};

	return (
		<TouchableOpacity onPress={fireInstantMatchPaymentRoutine}>
			<Text>
				{id}, {brand}, {last4}
			</Text>
		</TouchableOpacity>
	);
};

export default React.memo(PaymentOptionPreview);
