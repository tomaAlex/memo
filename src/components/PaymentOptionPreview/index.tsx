import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { CardPreview } from "types/index";
import styles from "./PaymentOptionPreview.module.scss";
import formatExpiryDate from "./utils/formatExpiryDate";
import Loading from "components/Loading";

type TProps = CardPreview & {
	handlePayment: () => Promise<void>;
};

const PaymentOptionPreviewComponent = ({ brand, expiryYear, expiryMonth, last4, handlePayment }: TProps) => {
	const [isMatchGettingPaid, setIsMatchGettingPaid] = useState(false);

	const firePaymentRoutine = async () => {
		if (isMatchGettingPaid) {
			return;
		}
		setIsMatchGettingPaid(true);
		await handlePayment();
		setIsMatchGettingPaid(false);
	};

	return (
		<TouchableOpacity onPress={firePaymentRoutine}>
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

export const PaymentOptionPreview = React.memo(PaymentOptionPreviewComponent);
