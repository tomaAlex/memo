import React from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import FormTextInputLabel from "./FormTextInputLabel";
import FormTextInputText from "./FormTextInputText";
import styles from "./FormTextInput.module.scss";

type TProps<D> = TextInput["props"] & {
	field: keyof D;
	children?: React.ReactNode;
	isMandatory?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
};

function FormTextInput<D>({ field, isMandatory, children, containerStyle, ...textInputProps }: TProps<D>) {
	// currently not working, marked as a bug in the official library, see:
	// https://stackoverflow.com/questions/72999587/how-do-i-access-a-formik-contexts-validationschema
	// const isMandatory: boolean = validationSchema?.fields[field]._exclusive.required || false;

	return (
		<View style={[styles.container, containerStyle]}>
			<FormTextInputLabel {...{ children, isMandatory }} />
			<FormTextInputText {...{ field, ...textInputProps }} />
		</View>
	);
}

export default React.memo(FormTextInput) as unknown as typeof FormTextInput;
