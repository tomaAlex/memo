import { FilterIcon } from "icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./SearchFiltersButton.module.scss";

type TProps = {
	showFiltersModal: () => void;
	color?: string;
	fill?: string;
};

const SearchFiltersButton = ({ showFiltersModal, color = "#fff", fill = "#fff" }: TProps) => {
	return (
		<TouchableOpacity onPress={showFiltersModal} style={styles.container}>
			<FilterIcon style={styles.container__icon} {...{ color, fill }} />
		</TouchableOpacity>
	);
};

export default React.memo(SearchFiltersButton);
