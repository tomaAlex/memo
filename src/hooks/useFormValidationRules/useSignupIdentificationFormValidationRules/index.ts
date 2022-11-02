import * as Yup from "yup";
import { Gender } from "types/index";
import { frowardDate, getEnumValues } from "utils/index";
import { useTranslation } from "react-i18next";

const eighteenYearsAgo = frowardDate(-18, 0, 0);
const oneHundredYearsAgo = frowardDate(-100, 0, 0);

export const useSignupIdentificationFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Identification.Errors" });
	const validationRules = {
		firstName: Yup.string()
			.max(500, () => translateErrors("firstName.tooLong"))
			.required(() => translateErrors("firstName.required")),
		lastName: Yup.string()
			.max(500, () => translateErrors("lastName.tooLong"))
			.required(() => translateErrors("lastName.required")),
		gender: Yup.string()
			.oneOf(getEnumValues(Gender))
			.required(() => translateErrors("gender.required")),
		birthDate: Yup.date()
			.max(eighteenYearsAgo, () => translateErrors("birthDate.tooYoung"))
			.min(oneHundredYearsAgo, () => translateErrors("birthDate.tooOld"))
			.required(() => translateErrors("birthDate.required")),
	};
	return Yup.object(validationRules);
};
