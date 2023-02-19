import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useSignupDescriptionFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Errors" });
	const allValidationRules = {
		description: Yup.string().max(1000, () => translateErrors("description.tooLong")),
	};
	return Yup.object(allValidationRules);
};
