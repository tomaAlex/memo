import { useTranslation } from "react-i18next";
import { frowardDate } from "utils/index";
import * as Yup from "yup";

const eighteenYearsAgo = frowardDate(-18, 0, 0);
const oneHundredYearsAgo = frowardDate(-100, 0, 0);

export const useSignupBirthdateFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Errors",
	});

	const validationRules = {
		birthDate: Yup.date()
			.max(eighteenYearsAgo, () => translateErrors("birthDate.tooYoung"))
			.min(oneHundredYearsAgo, () => translateErrors("birthDate.tooOld"))
			.required(() => translateErrors("birthDate.required")),
	};
	return Yup.object(validationRules);
};
