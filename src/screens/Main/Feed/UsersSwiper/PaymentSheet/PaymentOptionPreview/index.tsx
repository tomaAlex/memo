import React, { useContext, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview } from "types/index";
import UsersSwiperContext from "../../UsersSwiperContext";
import handleInstantMatchPayment from "./utils/handleInstantMatchPayment";
import styles from "./PaymentOptionPreview.module.scss";
import formatExpiryDate from "./utils/formatExpiryDate";
import Loading from "components/Loading";

type TProps = CardPreview & {
	refRBSheet: React.RefObject<RBSheet>;
	setWasBottomSheetPrematurelyClosed: (wasBottomSheetPrematurelyClosed: boolean) => void;
};

const PaymentOptionPreview = ({
	id,
	brand,
	expiryYear,
	expiryMonth,
	last4,
	refRBSheet,
	setWasBottomSheetPrematurelyClosed,
}: TProps) => {
	const { swiperReference, setIsSwiperBlocked, userToInstantlyMatchId } = useContext(UsersSwiperContext);
	const [isMatchGettingPaid, setIsMatchGettingPaid] = useState(false);

	const fireInstantMatchPaymentRoutine = async () => {
		if (isMatchGettingPaid) {
			return;
		}
		setIsMatchGettingPaid(true);
		await handleInstantMatchPayment(
			userToInstantlyMatchId,
			id,
			refRBSheet,
			setIsSwiperBlocked,
			swiperReference,
			setWasBottomSheetPrematurelyClosed
		);
		setIsMatchGettingPaid(false);
	};

	return (
		<TouchableOpacity onPress={fireInstantMatchPaymentRoutine}>
			<ImageBackground source={require("./background.png")} style={styles.container} borderRadius={10}>
				{isMatchGettingPaid ? (
					<View style={styles.container__loading}>
						<Loading />
					</View>
				) : (
					<>
						<Text style={styles.container__number}>{`.... .... .... ${last4}`}</Text>
						<View style={styles.container__brandAndExpiry}>
							<Text style={styles.container__brandAndExpiry__type}>{brand}</Text>
							<Text style={styles.container__brandAndExpiry__expiry}>{formatExpiryDate(expiryMonth, expiryYear)}</Text>
						</View>
					</>
				)}
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default React.memo(PaymentOptionPreview);
