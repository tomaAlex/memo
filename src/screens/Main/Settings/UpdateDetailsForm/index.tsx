import React, { useState } from "react";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormTextInput from "components/forms/FormTextInput";
import { useTranslation } from "react-i18next";
import store from "redux/store";
import { Country } from "country-state-list";
import CountryChoicePicker from "screens/Signup/Details/CountryChoicePicker";
import StateAndCityFields from "screens/Signup/Details/StateAndCityFields";

const UpdateDetailsForm = () => {
	const [translateLabels] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Labels" });
	const { location } = store.getState().user;
	const country = location?.country;
	const selectedCountry = country
		? Country.getAllCountries().find((possiblyMatchingCountry) => possiblyMatchingCountry.name === country)
		: undefined;
	const countryCode = selectedCountry ? selectedCountry.isoCode : undefined;
	const [selectedCountryCode, setSelectedCountryCode] = useState<string | undefined>(countryCode);

	return (
		<>
			<FormTextInput field="job" placeholder="Graphic Designer">
				<FormFieldLabel label={translateLabels("job")} />
			</FormTextInput>
			<FormTextInput field="school" placeholder="King's College London">
				<FormFieldLabel label={translateLabels("school")} />
			</FormTextInput>
			<FormTextInput field="description" placeholder="I like playing guitar and exercising">
				<FormFieldLabel label={translateLabels("description")} />
			</FormTextInput>
			<CountryChoicePicker {...{ selectedCountryCode, setSelectedCountryCode }} />
			{selectedCountryCode && <StateAndCityFields selectedCountryCode={selectedCountryCode} />}
		</>
	);
};

export default React.memo(UpdateDetailsForm);
