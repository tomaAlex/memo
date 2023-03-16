import React from "react";
import Loading from "components/Loading";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import FormSubmitButton from "components/forms/FormSubmitButton";
import styles from "./MatchReportingSectionFormSubmitButton.module.scss";

type TProps = {
	isReporting: boolean;
};

const MatchReportingSectionFormSubmitButton = ({ isReporting }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection.ReportForm.Labels",
	});

	return isReporting ? (
		<View style={styles.loadingContainer}>
			<Loading />
		</View>
	) : (
		<FormSubmitButton style={styles.container}>
			<Text style={styles.container__text}>{t("submit")}</Text>
		</FormSubmitButton>
	);
};

export default React.memo(MatchReportingSectionFormSubmitButton);
