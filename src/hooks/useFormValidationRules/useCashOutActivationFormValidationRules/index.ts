import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useCashOutActivationFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.CashOutActivationForm.Errors",
	});
	const allValidationRules = {
		businessMcc: Yup.string()
			.min(4, () => translateErrors("businessMcc.tooShort"))
			.max(4, () => translateErrors("businessMcc.tooLong"))
			.required(() => translateErrors("businessMcc.required")),
		businessWebsite: Yup.string()
			.min(4, () => translateErrors("businessWebsite.tooShort"))
			.max(255, () => translateErrors("businessWebsite.tooLong"))
			.required(() => translateErrors("businessWebsite.required")),
		termsAndConditions: Yup.boolean().oneOf([true], () => translateErrors("termsAndConditions.required")),
	};
	return Yup.object(allValidationRules);
};
