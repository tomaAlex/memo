import React from "react";
import { ExitIcon } from "icons/index";
import { useTranslation } from "react-i18next";
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./MatchReportingSectionFormModal.module.scss";
import MatchReportingSectionForm from "./MatchReportingSectionForm";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const MatchReportingSectionFormModal = ({ visible, onRequestClose }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection",
	});

	return (
		<Modal {...{ visible, onRequestClose }} animationType="slide">
			<SafeAreaView style={styles.container}>
				<View style={styles.container__header}>
					<TouchableOpacity onPress={onRequestClose} style={styles.container__header__closeButton}>
						<ExitIcon style={styles.container__header__closeButton__icon} color={"#F10065"} fill={"#F10065"} />
					</TouchableOpacity>
					<Text style={styles.container__header__caption}>{t("note")}</Text>
				</View>
				<View style={styles.container__repercussions}>
					<Text style={styles.container__repercussions__caption}>{t("Repercussions.caption")}</Text>
					<Text style={styles.container__repercussions__description}>{t("Repercussions.description")}</Text>
				</View>
				<MatchReportingSectionForm closeForm={onRequestClose} />
			</SafeAreaView>
		</Modal>
	);
};

export default React.memo(MatchReportingSectionFormModal);
