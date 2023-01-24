import React from "react";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormTextInput from "components/forms/FormTextInput";
import { convertChoicesToFormChoicePickerData } from "utils/index";
import { Orientation } from "types/index";
import { View } from "react-native";
import FormImagePicker from "components/forms/FormImagePicker";
import { useTranslation } from "react-i18next";
import styles from "./UpdateEmbodimentForm.module.scss";

const UpdateEmbodimentForm = () => {
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Embodiment.Labels",
	});

	return (
		<>
			<View style={styles.imagePickerContainer}>
				<FormImagePicker field={"photos"}>
					<FormFieldLabel label={translateLabels("photos")} />
				</FormImagePicker>
			</View>
			<FormTextInput field="height" placeholder="181" keyboardType="numeric">
				<FormFieldLabel label={translateLabels("height")} />
			</FormTextInput>
			<FormChoicePicker
				isMandatory
				data={convertChoicesToFormChoicePickerData(Orientation)}
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
				field="orientation"
			>
				<FormFieldLabel label={translateLabels("orientation")} />
			</FormChoicePicker>
		</>
	);
};

export default React.memo(UpdateEmbodimentForm);
