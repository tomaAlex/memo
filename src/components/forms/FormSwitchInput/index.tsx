import React from "react";
import { Switch, View } from "react-native";
import FormSwitchInputLabel from "./FormSwitchInputLabel";
import FormSwitchInputSwitcher from "./FormSwitchInputSwitcher";
import styles from "./FormSwitchInput.module.scss";

type TProps<D> = Switch["props"] & {
	field: keyof D;
	children?: React.ReactNode;
	isMandatory?: boolean;
};

function FormSwitchInput<D>({ field, isMandatory, children, ...switchProps }: TProps<D>) {
	// currently not working, marked as a bug in the official library, see:
	// https://stackoverflow.com/questions/72999587/how-do-i-access-a-formik-contexts-validationschema
	// const isMandatory: boolean = validationSchema?.fields[field]._exclusive.required || false;

	return (
		<View style={styles.container}>
			<FormSwitchInputLabel {...{ children, isMandatory }} />
			<FormSwitchInputSwitcher {...{ field, ...switchProps }} />
		</View>
	);
}

export default React.memo(FormSwitchInput) as unknown as typeof FormSwitchInput;
