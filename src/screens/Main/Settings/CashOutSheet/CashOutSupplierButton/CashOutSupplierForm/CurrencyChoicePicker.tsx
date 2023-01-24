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
			optionContainerStyle={{
				backgroundColor: "white",
				paddingVertical: "10%",
				borderRadius: 30,
				marginTop: "8%",
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
			searchTextStyle={{
				fontFamily: "Poppins-Regular",
				color: "black",
			}}
			searchStyle={{ backgroundColor: "white", borderRadius: 30 }}
			renderItem={FormChoicePickerItem}
			onChange={getCurrencyChoicePickerChangeHandler(handleChange)}
			field="currency"
		>
			<FormFieldLabel label={translateLabels("currency")} />
		</FormChoicePicker>
	);
};

export default React.memo(CurrencyChoicePicker);
