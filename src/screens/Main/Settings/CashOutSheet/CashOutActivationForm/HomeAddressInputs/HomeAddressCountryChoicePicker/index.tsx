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
