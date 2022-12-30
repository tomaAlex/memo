import getAllCurrencyCodes from "hooks/useFormValidationRules/useCashOutFormValidationRules/getAllCurrencyCodes";
import { IdLabeledData } from "types/index";

const getCurrencyChoicePickerData = (): IdLabeledData[] => {
	return getAllCurrencyCodes().map((currencyCode) => {
		return {
			key: currencyCode,
			label: currencyCode,
			value: currencyCode,
		};
	});
};
export default getCurrencyChoicePickerData;
