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
			}}
			searchStyle={{ backgroundColor: "white", borderRadius: 30 }}
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
