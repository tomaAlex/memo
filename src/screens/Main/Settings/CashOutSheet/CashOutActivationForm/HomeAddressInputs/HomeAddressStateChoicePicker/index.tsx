import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { FormChoicePickerItem } from "components";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormChoicePicker from "components/forms/FormChoicePicker";
import getHomeAddressStateChoicePickerData from "./utils/getHomeAddressStateChoicePickerData";

type TProps = {
	selectedCountryCode?: string;
};

const HomeAddressStateChoicePicker = ({ selectedCountryCode = "" }: TProps) => {
	const { handleChange } = useFormikContext();
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Labels",
	});

	return (
		<FormChoicePicker
			isMandatory
			field="homeAddressState"
			data={getHomeAddressStateChoicePickerData(selectedCountryCode)}
			renderItem={FormChoicePickerItem}
			onChange={({ value }) => {
				handleChange("homeAddressState")(value);
			}}
		>
			<FormFieldLabel label={translateLabels("homeAddressState")} />
		</FormChoicePicker>
	);
};

export default React.memo(HomeAddressStateChoicePicker);
