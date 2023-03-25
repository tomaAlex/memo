import React from "react";
import { BlockIcon } from "icons";
import { TouchableOpacity } from "react-native";
import styles from "./FlagButton.module.scss";

export type TProps = {
	showFlaggingModal: () => void;
	color?: string;
	fill?: string;
};

const FlagButton = ({ showFlaggingModal, color = "#f00", fill = "#f00" }: TProps) => {
	return (
		<TouchableOpacity onPress={showFlaggingModal} style={styles.container}>
			<BlockIcon style={styles.container__icon} {...{ color, fill }} />
		</TouchableOpacity>
	);
};

export default React.memo(FlagButton);
