import React from "react";
import { Text, TextProps } from "react-native";
import styles from "./FormFieldLabel.module.scss";

type TProps = TextProps & {
	label: string;
};

const FormFieldLabel = ({ label, ...textProps }: TProps) => {
	return (
		<Text style={styles.field} {...textProps}>
			{label}:
		</Text>
	);
};

export default React.memo(FormFieldLabel) as unknown as typeof FormFieldLabel;
