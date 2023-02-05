import { ExitIcon } from "icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./SearchFiltersModal.module.scss";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const SearchFiltersModal = ({ visible, onRequestClose }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.SearchFiltersModal" });

	return (
		<Modal {...{ visible, onRequestClose }} animationType="slide">
			<View style={styles.container}>
				<View style={styles.container__header}>
					<TouchableOpacity onPress={onRequestClose} style={styles.container__header__closeButton}>
						<ExitIcon style={styles.container__header__closeButton__icon} color={"#F10065"} fill={"#F10065"} />
					</TouchableOpacity>
					<Text style={styles.container__header__caption}>{t("header")}</Text>
				</View>
			</View>
		</Modal>
	);
};

export default React.memo(SearchFiltersModal);
