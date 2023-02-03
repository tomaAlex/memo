import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RBSheet from "react-native-raw-bottom-sheet";
import OfferPayment from "./OfferPayment";
import OfferPreview from "./OfferPreview";
import styles from "./PremiumPaymentRBSheet.module.scss";
import LinearGradient from "react-native-linear-gradient";
import { Text, View } from "react-native";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
};

const PremiumPaymentRBSheet = ({ refRBSheet }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.GetPremium.PaymentSheet",
	});
	const [displayPaymentOptions, setDisplayPaymentOptions] = useState(false);

	return (
		// https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148
		// @ts-ignore
		<RBSheet
			ref={refRBSheet}
			onClose={() => setDisplayPaymentOptions(false)}
			height={350}
			closeOnDagDown
			closeOnPressMask
			keyboardAvoidingViewEnabled
			customStyles={{
				container: styles.container,
				draggableIcon: styles.container__draggableIcon,
			}}
		>
			<LinearGradient colors={["#f5b029", "#ffffff"]} style={styles.container__gradient}>
				<View style={styles.container__titleContainer}>
					<Text style={styles.container__titleContainer__title}>{t("title")}</Text>
				</View>
				{!displayPaymentOptions ? (
					<OfferPreview {...{ refRBSheet, displayPaymentOptions: () => setDisplayPaymentOptions(true) }} />
				) : (
					<OfferPayment {...{ refRBSheet }} />
				)}
			</LinearGradient>
		</RBSheet>
	);
};

export default React.memo(PremiumPaymentRBSheet);
