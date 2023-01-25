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
			onChange={getCountryChoicePickerChangeHandler(handleChange)}
			field="bankAccountCountry"
		>
			<FormFieldLabel label={translateLabels("bankAccountCountry")} />
		</FormChoicePicker>
	);
};

export default React.memo(CountryChoicePicker);
