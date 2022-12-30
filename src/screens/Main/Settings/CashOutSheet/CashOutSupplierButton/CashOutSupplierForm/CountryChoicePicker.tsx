import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { FormChoicePickerItem } from "components/index";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormChoicePicker from "components/forms/FormChoicePicker";
import getCountryChoicePickerChangeHandler from "./utils/getCountryChoicePickerChangeHandler";
import getCountryChoicePickerData from "./utils/getCountryChoicePickerData";

const CountryChoicePicker = () => {
	const { handleChange } = useFormikContext();
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutSupplierForm.Labels",
	});

	return (
		<FormChoicePicker
			isMandatory
			data={getCountryChoicePickerData()}
			renderItem={FormChoicePickerItem}
			onChange={getCountryChoicePickerChangeHandler(handleChange)}
			field="bankAccountCountry"
		>
			<FormFieldLabel label={translateLabels("bankAccountCountry")} />
		</FormChoicePicker>
	);
};

export default React.memo(CountryChoicePicker);
