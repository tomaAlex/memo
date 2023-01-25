import { Country } from "country-state-list";
import { IdLabeledData } from "types/index";

const getCountryChoicePickerData = (): IdLabeledData[] => {
	return Country.getAllCountries().map(({ isoCode, name, flag }) => {
		return {
			key: isoCode,
			label: `${flag} ${name} (${isoCode})`,
			value: isoCode,
		};
	});
};
export default getCountryChoicePickerData;
