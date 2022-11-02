import React from "react";
import { useFormikContext } from "formik";
import { TextInput, View } from "react-native";
import FormFieldError from "./FormFieldError";
import FormFieldMandatoryNote from "./FormFieldMandatoryNote";

type TProps<D> = TextInput["props"] & {
	field: keyof D;
	children?: React.ReactNode;
	isMandatory?: boolean;
};

function FormTextInput<D>({ field, isMandatory, children, ...textInputProps }: TProps<D>) {
	const { handleChange, handleBlur, values, touched, errors } = useFormikContext<D>();

	// currently not working, marked as a bug in the official library, see:
	// https://stackoverflow.com/questions/72999587/how-do-i-access-a-formik-contexts-validationschema
	// const isMandatory: boolean = validationSchema?.fields[field]._exclusive.required || false;

	return (
		<View style={{ flexDirection: "row", display: "flex", paddingBottom: 5 }}>
			{children && (
				<View style={{ alignSelf: "center", flex: 0.4 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						{isMandatory && <FormFieldMandatoryNote />}
						{children}
					</View>
				</View>
			)}
			<View style={{ flex: 1 }}>
				<TextInput
					style={{ textAlign: "center" }}
					onChangeText={handleChange(field)}
					onBlur={handleBlur(field as string)}
					value={values[field] as string}
					{...textInputProps}
				/>
				<View style={{ alignSelf: "center" }}>
					<FormFieldError touched={touched} field={field} errors={errors} />
				</View>
			</View>
		</View>
	);
}

export default React.memo(FormTextInput) as unknown as typeof FormTextInput;
