import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormTextInput from "components/forms/FormTextInput";
import HomeAddressCountryChoicePicker from "./HomeAddressCountryChoicePicker";
import HomeAddressStateChoicePicker from "./HomeAddressStateChoicePicker";

const HomeAddressInputs = () => {
	const [selectedCountryCode, setSelectedCountryCode] = useState<string>();
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Labels",
	});

	return (
		<>
			<FormTextInput isMandatory field="homeAddressLine1">
				<FormFieldLabel label={translateLabels("homeAddressLine1")} />
			</FormTextInput>
			<FormTextInput field="homeAddressLine2">
				<FormFieldLabel label={translateLabels("homeAddressLine2")} />
			</FormTextInput>
			<HomeAddressCountryChoicePicker {...{ setSelectedCountryCode }} />
			<HomeAddressStateChoicePicker {...{ selectedCountryCode }} />
			<FormTextInput isMandatory field="homeAddressCity">
				<FormFieldLabel label={translateLabels("homeAddressCity")} />
			</FormTextInput>
			<FormTextInput isMandatory field="homeAddressPostalCode">
				<FormFieldLabel label={translateLabels("homeAddressPostalCode")} />
			</FormTextInput>
		</>
	);
};

export default React.memo(HomeAddressInputs);
