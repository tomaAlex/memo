import FormFieldLabel from "components/forms/FormFieldLabel";
import FormSubmitButton from "components/forms/FormSubmitButton";
import FormTextInput from "components/forms/FormTextInput";
import { Formik, FormikValues } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TextProps, View } from "react-native";
import styles from "./TextForm.module.scss";

type FormComponent = {
	fieldName: string;
	label: string;
	isMandatory: boolean;
	placeholder: string;
} & TextInput["props"] &
	TextProps;

type TProps = {
	schema: any;
	initialValues: FormikValues;
	submissionHandler: (data: FormikValues) => void;
	data: Array<FormComponent>;
};

const TextForm = ({ schema, initialValues, submissionHandler, data }: TProps) => {
	return (
		<Formik validationSchema={schema} initialValues={initialValues} onSubmit={submissionHandler}>
			<View style={styles.container}>
				{data.map((element, index) => {
					return (
						<View key={index} style={styles.container__formContainer}>
							<FormTextInput field={element.fieldName} {...element} style={styles.container__textInput}>
								<FormFieldLabel
									removeColon={true}
									{...element}
									style={styles.container__textInput__formLabel}
								></FormFieldLabel>
							</FormTextInput>
						</View>
					);
				})}
				<View style={styles.container__buttonContainer}>
					<FormSubmitButton style={styles.container__buttonContainer__buttonDimensions}>
						<Text style={styles.container__buttonContainer__buttonText}>Continue</Text>
					</FormSubmitButton>
				</View>
			</View>
		</Formik>
	);
};

export default React.memo(TextForm) as unknown as typeof TextForm;
