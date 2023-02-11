import React from "react";
import { Text, TextProps } from "react-native";
import styles from "./FormFieldLabel.module.scss";

type TProps = TextProps & {
	label: string;
	removeColon?: boolean;
};

const FormFieldLabel = ({ label, removeColon, ...textProps }: TProps) => {
	const colonString = removeColon ? "" : ":";
	const textToShow = label + colonString;
	return (
		<Text style={styles.field} {...textProps}>
			{textToShow}
		</Text>
	);
};

export default React.memo(FormFieldLabel) as unknown as typeof FormFieldLabel;
