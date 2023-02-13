import FormFieldLabel from "components/forms/FormFieldLabel";
import React from "react";
import { TextProps } from "react-native";
import styles from "./Label.module.scss";

type TProps = {
	fieldName: string;
	label: string;
	isMandatory: boolean;
} & TextProps;

const SignUpFormLabel = (props: TProps) => {
	return <FormFieldLabel removeColon={true} {...props} style={styles.formLabel} />;
};

export default React.memo(SignUpFormLabel) as unknown as typeof SignUpFormLabel;
