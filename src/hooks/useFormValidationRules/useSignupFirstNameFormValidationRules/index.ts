import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useSignupFirstNameFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Errors",
	});

	const validationRules = {
		firstName: Yup.string()
			.max(500, () => translateErrors("firstName.tooLong"))
			.required(() => translateErrors("firstName.required")),
	};
	return Yup.object(validationRules);
};
