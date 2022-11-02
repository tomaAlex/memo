import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import connector from "../../../redux/connector";
import "../../../translations/i18.config";
import { Gender, ScreenNames, ScreenProps } from "types/index";
import { Formik } from "formik";
import FormTextInput from "components/forms/FormTextInput";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import FormDatePicker from "components/forms/FormDatePicker";
import { useSignupIdentificationFormValidationRules } from "hooks/index";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormSubmitButton from "components/forms/FormSubmitButton";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import { useTranslation } from "react-i18next";

const Identification = ({ navigation }: ScreenProps<ScreenNames.Identification>) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Identification.Labels" });
	const identificationSchema = useSignupIdentificationFormValidationRules();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Formik
					validationSchema={identificationSchema}
					initialValues={{ firstName: "", lastName: "", gender: "", birthDate: "" }}
					onSubmit={(identification) => navigation.navigate("Details", { identification })}
				>
					<View style={{ width: "80%" }}>
						<FormTextInput isMandatory field="firstName" placeholder="John">
							<FormFieldLabel label={translateLabels("firstName")} />
						</FormTextInput>
						<FormTextInput isMandatory field="lastName" placeholder="Smith">
							<FormFieldLabel label={translateLabels("lastName")} />
						</FormTextInput>
						<FormChoicePicker
							isMandatory
							data={convertChoicesToFormChoicePickerData(Gender)}
							renderItem={FormChoicePickerItem}
							field="gender"
						>
							<FormFieldLabel label={translateLabels("gender")} />
						</FormChoicePicker>
						<FormDatePicker isMandatory field="birthDate">
							<FormFieldLabel label={translateLabels("birthDate")} />
						</FormDatePicker>
						<View style={{ marginTop: 50 }}>
							<FormSubmitButton />
						</View>
					</View>
				</Formik>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default connector(Identification);
