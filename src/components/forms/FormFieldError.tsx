import React from "react";
import { Text } from "react-native";
import { FormikErrors, FormikTouched } from "formik";

type TProps<D> = {
	touched: FormikTouched<D>;
	field: keyof D;
	errors: FormikErrors<D>;
};

function FormFieldError<D>({ touched, field, errors }: TProps<D>) {
	const canDisplay = touched[field] as boolean;
	const errorMessages = errors[field];
	const isErrorVisible = (canDisplay && errorMessages) as boolean;
	return isErrorVisible ? (
		<Text style={{ color: "red", fontFamily: "Poppins-Light" }}>{errorMessages as string}</Text>
	) : null;
}

export default React.memo(FormFieldError) as unknown as typeof FormFieldError;
