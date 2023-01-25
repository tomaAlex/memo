import * as Yup from "yup";
import { Country, State } from "country-state-list";
import { useTranslation } from "react-i18next";
import { BusinessType, BusinessTypes } from "types/index";
import { phoneRegexExpression } from "constants/index";

export const useCashOutActivationFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Errors",
	});
	const allValidationRules = {
		businessType: Yup.string()
			.oneOf(BusinessTypes as unknown as BusinessType[])
			.required(() => translateErrors("businessType.required")),
		businessName: Yup.string()
			.min(2, () => translateErrors("businessName.tooShort"))
			.max(255, () => translateErrors("businessName.tooLong"))
			.when("businessType", {
				is: "individual",
				then: Yup.string().notRequired(),
				otherwise: Yup.string().required(() => translateErrors("businessName.required")),
			}),
		homeAddressLine1: Yup.string()
			.min(4, () => translateErrors("homeAddressLine1.tooShort"))
			.max(255, () => translateErrors("homeAddressLine1.tooLong"))
			.required(() => translateErrors("homeAddressLine1.required")),
		homeAddressLine2: Yup.string()
			.min(4, () => translateErrors("homeAddressLine2.tooShort"))
			.max(255, () => translateErrors("homeAddressLine2.tooLong")),
		homeAddressCountry: Yup.string()
			.oneOf(Country.getAllCountries().map((country) => country.isoCode))
			.required(() => translateErrors("homeAddressCountry.required")),
		homeAddressState: Yup.string()
			.oneOf(State.getAllStates().map((state) => state.isoCode))
			.required(() => translateErrors("homeAddressState.required")),
		homeAddressCity: Yup.string()
			.max(85, () => translateErrors("homeAddressCity.tooLong"))
			.required(() => translateErrors("homeAddressCity.required")),
		homeAddressPostalCode: Yup.string()
			.min(2, () => translateErrors("homeAddressPostalCode.tooShort"))
			.max(20, () => translateErrors("homeAddressPostalCode.tooLong"))
			.required(() => translateErrors("homeAddressPostalCode.required")),
		businessMcc: Yup.string()
			.min(4, () => translateErrors("businessMcc.tooShort"))
			.max(4, () => translateErrors("businessMcc.tooLong"))
			.required(() => translateErrors("businessMcc.required")),
		businessWebsite: Yup.string()
			.min(4, () => translateErrors("businessWebsite.tooShort"))
			.max(255, () => translateErrors("businessWebsite.tooLong"))
			.required(() => translateErrors("businessWebsite.required")),
		personalPhone: Yup.string()
			.required(() => translateErrors("personalPhone.required"))
			.test({
				name: "phoneNumber",
				message: translateErrors("personalPhone.validFormat"),
				test: (possiblyValidPersonalPhone) =>
					possiblyValidPersonalPhone === undefined ? true : phoneRegexExpression.test(possiblyValidPersonalPhone),
			}),
		businessPhone: Yup.string()
			.required(() => translateErrors("businessPhone.required"))
			.test({
				name: "phoneNumber",
				message: translateErrors("businessPhone.validFormat"),
				test: (possiblyValidBusinessPhone) =>
					possiblyValidBusinessPhone === undefined ? true : phoneRegexExpression.test(possiblyValidBusinessPhone),
			}),
		termsAndConditions: Yup.boolean().oneOf([true], () => translateErrors("termsAndConditions.required")),
	};
	return Yup.object(allValidationRules);
};
