import React from "react";
import { useFormikContext } from "formik";
import { TextInput, View } from "react-native";
import FormFieldError from "../FormFieldError";
import styles from "./FormTextInput.module.scss";

type TProps<D> = TextInput["props"] & {
	field: keyof D;
};

function FormTextInputText<D>({ field, ...textInputProps }: TProps<D>) {
	const { handleChange, handleBlur, values, touched, errors } = useFormikContext<D>();

	return (
		<View style={styles.container__input}>
			<TextInput
				style={styles.container__input__text}
				onChangeText={handleChange(field)}
				onBlur={handleBlur(field as string)}
				value={values[field] as string}
				{...textInputProps}
			/>
			<View style={styles.container__input__error}>
				<FormFieldError touched={touched} field={field} errors={errors} />
			</View>
		</View>
	);
}

export default React.memo(FormTextInputText) as unknown as typeof FormTextInputText;
