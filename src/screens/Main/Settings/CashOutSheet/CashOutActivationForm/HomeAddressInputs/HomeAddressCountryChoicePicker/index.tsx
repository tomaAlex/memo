import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { FormChoicePickerItem } from "components";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormChoicePicker from "components/forms/FormChoicePicker";
import getHomeAddressCountryChoicePickerData from "./utils/getHomeAddressCountryChoicePickerData";

type TProps = {
	setSelectedCountryCode: (selectedCountryCode: string) => void;
};

const HomeAddressCountryChoicePicker = ({ setSelectedCountryCode }: TProps) => {
	const { handleChange } = useFormikContext();
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Labels",
	});

	return (
		<FormChoicePicker
			isMandatory
			field="homeAddressCountry"
			data={getHomeAddressCountryChoicePickerData()}
			renderItem={FormChoicePickerItem}
			onChange={({ value }) => {
				setSelectedCountryCode(value);
				handleChange("homeAddressCountry")(value);
			}}
		>
			<FormFieldLabel label={translateLabels("homeAddressCountry")} />
		</FormChoicePicker>
	);
};

export default React.memo(HomeAddressCountryChoicePicker);
