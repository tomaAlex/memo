import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import styles from "./DeleteAccountButton.module.scss";
import { getDeletionConfirmation } from "./utils";

const DeleteAccountButton = () => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.DeleteAccountButton" });

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				getDeletionConfirmation(t);
			}}
		>
			<Text style={styles.container__caption}>{t("caption")}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(DeleteAccountButton);
