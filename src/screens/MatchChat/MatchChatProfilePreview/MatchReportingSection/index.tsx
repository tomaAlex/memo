import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./MatchReportingSection.module.scss";
import MatchReportingSectionFormModal from "./MatchReportingSectionFormModal";

const MatchReportingSection = () => {
	// const [t] = useTranslation("translation", {
	// 	keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection",
	// });
	const [isFormModalVisible, setIsFormModalVisible] = useState(false);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.container__button}
				onPress={() => {
					setIsFormModalVisible(true);
				}}
			>
				{/* <Text style={styles.container__button__caption}>{t("caption")}</Text> */}
				<Text style={styles.container__button__caption}>🚨</Text>
			</TouchableOpacity>
			<MatchReportingSectionFormModal
				visible={isFormModalVisible}
				onRequestClose={() => {
					setIsFormModalVisible(false);
				}}
			/>
		</View>
	);
};

export default React.memo(MatchReportingSection);
