import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { FormChoicePickerItem } from "components/index";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormChoicePicker from "components/forms/FormChoicePicker";
import getCurrencyChoicePickerChangeHandler from "./utils/getCurrencyChoicePickerChangeHandler";
import getCurrencyChoicePickerData from "./utils/getCurrencyChoicePickerData";

const CurrencyChoicePicker = () => {
	const { handleChange } = useFormikContext();
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutSupplierForm.Labels",
	});

	return (
		<FormChoicePicker
			isMandatory
			data={getCurrencyChoicePickerData()}
			renderItem={FormChoicePickerItem}
			onChange={getCurrencyChoicePickerChangeHandler(handleChange)}
			field="currency"
		>
			<FormFieldLabel label={translateLabels("currency")} />
		</FormChoicePicker>
	);
};

export default React.memo(CurrencyChoicePicker);
