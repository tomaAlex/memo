import React from "react";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormTextInput from "components/forms/FormTextInput";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import { Orientation } from "types/index";
import { View } from "react-native";
import FormImagePicker from "components/forms/FormImagePicker";
import { useTranslation } from "react-i18next";

const UpdateEmbodimentForm = () => {
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Embodiment.Labels",
	});

	return (
		<>
			<FormTextInput field="height" placeholder="181" keyboardType="numeric">
				<FormFieldLabel label={translateLabels("height")} />
			</FormTextInput>
			<FormChoicePicker
				isMandatory
				data={convertChoicesToFormChoicePickerData(Orientation)}
				renderItem={FormChoicePickerItem}
				field="orientation"
			>
				<FormFieldLabel label={translateLabels("orientation")} />
			</FormChoicePicker>
			<View style={{ height: 300 }}>
				<FormImagePicker field={"photos"}>
					<FormFieldLabel label={translateLabels("photos")} />
				</FormImagePicker>
			</View>
		</>
	);
};

export default React.memo(UpdateEmbodimentForm);
