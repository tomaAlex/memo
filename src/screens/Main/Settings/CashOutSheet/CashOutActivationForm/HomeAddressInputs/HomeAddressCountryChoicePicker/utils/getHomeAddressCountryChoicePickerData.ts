import { Country } from "country-state-list";
import { IdLabeledData } from "types/index";

const getHomeAddressCountryChoicePickerData = (): IdLabeledData[] => {
	return Country.getAllCountries().map((country) => {
		return {
			key: country.isoCode,
			label: `${country.flag} ${country.name}`,
			value: country.isoCode,
		};
	});
};
export default getHomeAddressCountryChoicePickerData;
