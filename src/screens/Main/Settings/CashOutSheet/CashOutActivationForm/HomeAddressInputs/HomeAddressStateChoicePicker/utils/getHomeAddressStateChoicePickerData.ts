import { State } from "country-state-list";

const getHomeAddressStateChoicePickerData = (selectedCountryCode: string) => {
	return State.getStatesOfCountry(selectedCountryCode).map((state) => {
		return {
			key: state.isoCode,
			label: state.name,
			value: state.isoCode,
		};
	});
};

export default getHomeAddressStateChoicePickerData;
