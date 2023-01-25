import * as Yup from "yup";
import { Country } from "country-state-list";
import { useTranslation } from "react-i18next";
import getAllCurrencyCodes from "./getAllCurrencyCodes";

export const useCashOutFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutSupplierForm.Errors",
	});
	const allValidationRules = {
		bankAccountNumber: Yup.string()
			.min(8, () => translateErrors("bankAccountNumber.tooShort"))
			.max(40, () => translateErrors("bankAccountNumber.tooLong"))
			.required(() => translateErrors("bankAccountNumber.required")),
		bankAccountCountry: Yup.string()
			.oneOf(Country.getAllCountries().map((country) => country.isoCode))
			.required(() => translateErrors("bankAccountCountry.required")),
		bankRoutingNumber: Yup.string()
			.min(2, () => translateErrors("bankRoutingNumber.tooShort"))
			.max(40, () => translateErrors("bankRoutingNumber.tooLong")),
		currency: Yup.string()
			.oneOf(getAllCurrencyCodes())
			.required(() => translateErrors("currency.required")),
	};
	return Yup.object(allValidationRules);
};
