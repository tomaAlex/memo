import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import getBusinessTypePickerData from "./utils/getBusinessTypePickerData";

type TProps = {
	setIsBusinessNameRequired: (isBusinessNameRequired: boolean) => void;
};

const BusinessTypePicker = ({ setIsBusinessNameRequired }: TProps) => {
	const { handleChange } = useFormikContext();
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Labels",
	});

	return (
		<FormChoicePicker
			field="businessType"
			isMandatory
			data={getBusinessTypePickerData()}
			renderItem={FormChoicePickerItem}
			onChange={({ value }) => {
				const isBusinessNameRequired = value !== "individual";
				setIsBusinessNameRequired(isBusinessNameRequired);
				handleChange("businessType")(value);
			}}
		>
			<FormFieldLabel label={translateLabels("businessType")} />
		</FormChoicePicker>
	);
};

export default React.memo(BusinessTypePicker);
