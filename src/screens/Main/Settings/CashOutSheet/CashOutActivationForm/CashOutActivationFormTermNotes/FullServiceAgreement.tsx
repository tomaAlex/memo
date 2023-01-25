import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, Text } from "react-native";
import styles from "../CashOutActivationForm.module.scss";

const FullServiceAgreement = () => {
	const [translateFullServiceAgreementNotes] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Notes.FullServiceAgreement",
	});
	return (
		<Text style={styles.note__text}>
			{translateFullServiceAgreementNotes("beforeConnectedAccountAgreement")}{" "}
			<Text
				style={styles.note__text__link}
				onPress={() => Linking.openURL("https://stripe.com/connect-account/legal/full")}
			>
				{translateFullServiceAgreementNotes("connectedAccountAgreement")},{" "}
			</Text>
			<Text>{translateFullServiceAgreementNotes("beforeStripeToS")} </Text>
			<Text style={styles.note__text__link} onPress={() => Linking.openURL("https://stripe.com/legal")}>
				{translateFullServiceAgreementNotes("stripeToS")}{" "}
			</Text>
			<Text>{translateFullServiceAgreementNotes("afterStripeToS")}.</Text>
		</Text>
	);
};

export default React.memo(FullServiceAgreement);
