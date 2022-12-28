import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview } from "types/index";
import UsersSwiperContext from "../../UsersSwiperContext";
import handleInstantMatchPayment from "./utils/handleInstantMatchPayment";

type TProps = CardPreview & {
	refRBSheet: React.RefObject<RBSheet>;
	setWasBottomSheetPrematurelyClosed: (wasBottomSheetPrematurelyClosed: boolean) => void;
};

const PaymentOptionPreview = ({ id, brand, last4, refRBSheet, setWasBottomSheetPrematurelyClosed }: TProps) => {
	const { swiperReference, setIsSwiperBlocked, userToInstantlyMatchId } = useContext(UsersSwiperContext);

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
