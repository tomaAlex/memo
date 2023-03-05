import React from "react";
import { Text, View } from "react-native";
import styles from "./EmailLoadingModal.module.scss";

type TProps = {
	note: string;
};

const EmailLoadingModalNote = ({ note }: TProps) => {
	return (
		<View style={styles.container__noteContainer}>
			<Text style={styles.container__noteContainer__note}>{note}</Text>
		</View>
	);
};

export default React.memo(EmailLoadingModalNote);
