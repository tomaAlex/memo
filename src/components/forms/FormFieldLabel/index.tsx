import React from "react";
import { Text } from "react-native";
import styles from "./FormFieldLabel.module.scss";

type TProps = {
	label: string;
};

const FormFieldLabel = ({ label }: TProps) => {
	return <Text style={styles.field}>{label}:</Text>;
};

export default React.memo(FormFieldLabel) as unknown as typeof FormFieldLabel;
