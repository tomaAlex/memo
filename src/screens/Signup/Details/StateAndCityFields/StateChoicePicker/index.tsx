import React from "react";
import FormChoicePicker, { FormChoicePickerItem } from "components/forms/FormChoicePicker";
import FormFieldLabel from "components/forms/FormFieldLabel";
import { State } from "country-state-list";
import { useTranslation } from "react-i18next";

type TProps = {
	selectedCountryCode: string;
};

const StateChoicePicker = ({ selectedCountryCode }: TProps) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Labels" });
	return (
		<FormChoicePicker
			isMandatory
			data={State.getStatesOfCountry(selectedCountryCode).map((state) => {
				return {
					key: state.isoCode,
					label: state.name,
					value: state.name,
				};
			})}
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
			renderItem={FormChoicePickerItem}
			field="locationState"
		>
			<FormFieldLabel label={translateLabels("location.state")} />
		</FormChoicePicker>
	);
};

export default React.memo(StateChoicePicker);
