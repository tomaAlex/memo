import { ExitIcon } from "icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { cx } from "utils/index";
import SearchFiltersForm from "./SearchFiltersForm";
import styles from "./SearchFiltersModal.module.scss";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const SearchFiltersModal = ({ visible, onRequestClose }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.SearchFiltersModal" });

	return (
		<View style={cx(styles.container, [styles.container__opened, visible], [styles.container__closed, !visible])}>
			<View style={styles.container__header}>
				<TouchableOpacity onPress={onRequestClose} style={styles.container__header__closeButton}>
					<ExitIcon style={styles.container__header__closeButton__icon} color={"#F10065"} fill={"#F10065"} />
				</TouchableOpacity>
				<Text style={styles.container__header__caption}>{t("header")}</Text>
			</View>
			<SearchFiltersForm />
		</View>
	);
};

export default React.memo(SearchFiltersModal);
