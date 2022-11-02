import React from "react";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormTextInput from "components/forms/FormTextInput";
import StateChoicePicker from "./StateChoicePicker";
import { useTranslation } from "react-i18next";

type TProps = {
	selectedCountryCode: string;
};

const StateAndCityFields = ({ selectedCountryCode }: TProps) => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Labels" });
	return (
		<>
			<StateChoicePicker selectedCountryCode={selectedCountryCode} />
			<FormTextInput isMandatory field="locationCity" placeholder="London">
				<FormFieldLabel label={translateLabels("location.city")} />
			</FormTextInput>
		</>
	);
};

export default React.memo(StateAndCityFields);
