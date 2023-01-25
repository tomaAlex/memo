import React from "react";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import FormFieldLabel from "components/forms/FormFieldLabel";
import { useFormikContext } from "formik";
import getCountryChoicePickerData from "./utils/getCountryChoicePickerData";
import getCountryChoicePickerChangeHandler from "./utils/getCountryChoicePickerChangeHandler";
import { useTranslation } from "react-i18next";

type TProps = {
	selectedCountryCode?: string;
	setSelectedCountryCode: (selectedCountryCode: string) => void;
};

const CountryChoicePicker = ({ selectedCountryCode, setSelectedCountryCode }: TProps) => {
	const { handleChange } = useFormikContext();
	const wasLocationCompleted = selectedCountryCode !== undefined;
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Labels" });
	return (
		<FormChoicePicker
			isMandatory={wasLocationCompleted}
			data={getCountryChoicePickerData()}
			renderItem={FormChoicePickerItem}
			fullHeight={true}
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
			onChange={getCountryChoicePickerChangeHandler(handleChange, setSelectedCountryCode)}
			field="locationCountry"
		>
			<FormFieldLabel label={translateLabels("location.country")} />
		</FormChoicePicker>
	);
};

export default React.memo(CountryChoicePicker);
