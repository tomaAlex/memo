import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useSignupLastNameFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Errors",
	});

	const validationRules = {
		lastName: Yup.string()
			.max(500, () => translateErrors("lastName.tooLong"))
			.required(() => translateErrors("lastName.required")),
	};
	return Yup.object(validationRules);
};
