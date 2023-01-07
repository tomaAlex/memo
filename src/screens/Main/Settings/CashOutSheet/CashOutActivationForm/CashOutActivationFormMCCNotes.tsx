import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, Text } from "react-native";
import styles from "./CashOutActivationForm.module.scss";

const CashOutActivationFormMCCNotes = () => {
	const [translateNotes] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Notes.MCC",
	});
	return (
		<Text style={styles.note__text}>
			{translateNotes("beforeMCCReference")}{" "}
			<Text
				style={styles.note__text__link}
				onPress={() => Linking.openURL("https://stripe.com/docs/connect/setting-mcc#list")}
			>
				{translateNotes("MCCReference")}.
			</Text>
		</Text>
	);
};

export default React.memo(CashOutActivationFormMCCNotes);
