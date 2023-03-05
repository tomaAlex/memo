import React from "react";
import { Platform, TextInput, TextProps, View, ViewStyle } from "react-native";
import Label from "../Label";
import Submit from "../Submit";
import { Formik, FormikValues } from "formik";
import FormTextInput from "components/forms/FormTextInput";
import styles from "./TextForm.module.scss";

type FormComponent = {
	fieldName: string;
	label: string;
	isMandatory: boolean;
	placeholder: string;
	textInputHeight?: string | number;
} & TextInput["props"] &
	TextProps;

type TProps = {
	schema: any;
	initialValues: FormikValues;
	submissionHandler: (data: FormikValues) => void;
	data: Array<FormComponent>;
	buttonSpacing?: ViewStyle["marginTop"];
};

const TextForm = ({ schema, initialValues, submissionHandler, data, buttonSpacing = "10%" }: TProps) => {
	return (
		<Formik validationSchema={schema} initialValues={initialValues} onSubmit={submissionHandler}>
			<View style={styles.container}>
				{data.map((element, index) => {
					return (
						<View key={index} style={styles.container__formContainer}>
							<FormTextInput
								field={element.fieldName}
								{...element}
								style={[
									styles.container__textInput,
									element.textInputHeight && { height: element.textInputHeight },
									Platform.OS === "android" && { paddingTop: "3%" },
								]}
							>
								<Label {...element} />
							</FormTextInput>
						</View>
					);
				})}
				<Submit spacing={buttonSpacing} />
			</View>
		</Formik>
	);
};

export default React.memo(TextForm) as unknown as typeof TextForm;
