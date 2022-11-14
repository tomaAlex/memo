import React from "react";
import { Gender } from "types/index";
import { useTranslation } from "react-i18next";
import FormTextInput from "components/forms/FormTextInput";
import FormDatePicker from "components/forms/FormDatePicker";
import FormFieldLabel from "components/forms/FormFieldLabel";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";

const UpdateIdentificationForm = () => {
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Labels",
	});

	return (
		<>
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
		</>
	);
};

export default React.memo(UpdateIdentificationForm);