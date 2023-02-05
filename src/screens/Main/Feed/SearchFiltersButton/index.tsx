import { BurgerMenu } from "icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./SearchFiltersButton.module.scss";

type TProps = {
	showFiltersModal: () => void;
};

const SearchFiltersButton = ({ showFiltersModal }: TProps) => {
	return (
		<TouchableOpacity onPress={showFiltersModal} style={styles.container}>
			<BurgerMenu style={styles.container__icon} color={"#fff"} fill={"#fff"} />
		</TouchableOpacity>
	);
};

export default React.memo(SearchFiltersButton);
