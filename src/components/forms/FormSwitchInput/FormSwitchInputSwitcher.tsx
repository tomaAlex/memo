import React from "react";
import { useFormikContext } from "formik";
import { Switch, View } from "react-native";
import FormFieldError from "../FormFieldError";
import styles from "./FormSwitchInput.module.scss";

type TProps<D> = Switch["props"] & {
	field: keyof D;
};

function FormSwitchInputSwitcher<D>({ field, ...switchProps }: TProps<D>) {
	const { setFieldValue, handleBlur, values, touched, errors } = useFormikContext<D>();

	return (
		<View style={styles.container__switcher}>
			<Switch
				style={styles.container__switcher__control}
				onValueChange={(newSwitchValue) => setFieldValue(field as string, newSwitchValue)}
				// the best approximation of `onBlur` for the date picker
				onTouchEnd={handleBlur(field as string)}
				value={values[field] as boolean}
				{...switchProps}
			/>
			<View style={styles.container__switcher__error}>
				<FormFieldError touched={touched} field={field} errors={errors} />
			</View>
		</View>
	);
}

export default React.memo(FormSwitchInputSwitcher) as unknown as typeof FormSwitchInputSwitcher;
