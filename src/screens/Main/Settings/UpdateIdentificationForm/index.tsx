import React from "react";
import { Gender } from "types/index";
import { useTranslation } from "react-i18next";
import FormTextInput from "components/forms/FormTextInput";
import FormDatePicker from "components/forms/FormDatePicker";
import FormFieldLabel from "components/forms/FormFieldLabel";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";

const UpdateIdentificationForm = () => {
	const [translateEmbodimentLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Embodiment.Labels",
	});

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
			<FormTextInput field="height" placeholder="181" keyboardType="numeric">
				<FormFieldLabel label={translateEmbodimentLabels("height")} />
			</FormTextInput>
			<FormChoicePicker
				isMandatory
				data={convertChoicesToFormChoicePickerData(Gender)}
				optionContainerStyle={{
					backgroundColor: "white",
					paddingVertical: "10%",
					borderRadius: 30,
				}}
				optionTextStyle={{
					fontFamily: "Poppins-Regular",
				}}
				cancelTextStyle={{
					fontFamily: "Poppins-Regular",
				}}
				cancelStyle={{
					backgroundColor: "white",
					borderRadius: 30,
				}}
				search={false}
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
