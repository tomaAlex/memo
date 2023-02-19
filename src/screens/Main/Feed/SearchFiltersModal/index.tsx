import { ExitIcon } from "icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { cx } from "utils/index";
import SearchFiltersForm from "./SearchFiltersForm";
import styles from "./SearchFiltersModal.module.scss";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
	resetRecommendations: () => void;
};

const SearchFiltersModal = ({ visible, onRequestClose, resetRecommendations }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.SearchFiltersModal" });

	return (
		<SafeAreaView
			style={cx(styles.container, [styles.container__opened, visible], [styles.container__closed, !visible])}
		>
			<View style={styles.container__header}>
				<TouchableOpacity onPress={onRequestClose} style={styles.container__header__closeButton}>
					<ExitIcon style={styles.container__header__closeButton__icon} color={"#F10065"} fill={"#F10065"} />
				</TouchableOpacity>
				<Text style={styles.container__header__caption}>{t("header")}</Text>
			</View>
			<SearchFiltersForm {...{ resetRecommendations }} />
		</SafeAreaView>
	);
};

export default React.memo(SearchFiltersModal);
