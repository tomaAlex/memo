import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, Text } from "react-native";
import styles from "../CashOutActivationForm.module.scss";

const RecipientServiceAgreement = () => {
	const [translateRecipientServiceAgreementNotes] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Notes.RecipientServiceAgreement",
	});
	return (
		<Text style={styles.note__text}>
			{translateRecipientServiceAgreementNotes("beforeStripeRecipientAgreement")}{" "}
			<Text
				style={styles.note__text__link}
				onPress={() => Linking.openURL("https://stripe.com/connect-account/legal/recipient")}
			>
				{translateRecipientServiceAgreementNotes("stripeRecipientAgreement")}{" "}
			</Text>
			<Text>{translateRecipientServiceAgreementNotes("afterStripeRecipientAgreement")}.</Text>
		</Text>
	);
};

export default React.memo(RecipientServiceAgreement);
