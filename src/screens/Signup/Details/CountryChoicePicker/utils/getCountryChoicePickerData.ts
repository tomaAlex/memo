import { Country } from "country-state-list";
import { IdLabeledData } from "types/index";

const getCountryChoicePickerData = (): IdLabeledData[] => {
	return Country.getAllCountries().map((country) => {
		return {
			key: country.isoCode,
			label: `${country.flag} ${country.name}`,
			value: country.name,
		};
	});
};
export default getCountryChoicePickerData;
