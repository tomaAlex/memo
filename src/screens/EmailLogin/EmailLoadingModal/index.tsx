import React from "react";
import { View } from "react-native";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import styles from "./EmailLoadingModal.module.scss";
import EmailLoadingModalNote from "./EmailLoadingModalNote";

const EmailLoadingModal = () => {
	const [translateNotes] = useTranslation("translation", { keyPrefix: "Screens.EmailLogin.EmailLoadingModal" });

	return (
		<View style={styles.container}>
			<EmailLoadingModalNote note={translateNotes("sentLoginEmailLink")} />
			<Loading />
			<EmailLoadingModalNote note={translateNotes("linkOpeningWarning")} />
		</View>
	);
};

export default React.memo(EmailLoadingModal);
