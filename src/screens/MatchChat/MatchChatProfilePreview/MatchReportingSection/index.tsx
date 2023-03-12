import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./MatchReportingSection.module.scss";

type TProps = {
	userToReportId: string;
	historyMatchId: string;
};

const MatchReportingSection = ({ userToReportId, historyMatchId }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection",
	});

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.container__button}>
				<Text style={styles.container__button__caption}>{t("caption")}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default React.memo(MatchReportingSection);
