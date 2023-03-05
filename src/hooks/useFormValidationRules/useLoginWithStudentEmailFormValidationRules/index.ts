import * as Yup from "yup";
import { useTranslation } from "react-i18next";
// import getAllowedEmailsRegexExpression from "./getAllowedEmailsRegexExpression";

export const useLoginWithStudentEmailFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Login.StudentEmailLoginForm.Errors",
	});
	// const possibleEmailsRegexExpression = getAllowedEmailsRegexExpression();
	const allValidationRules = {
		email: Yup.string()
			.required(() => translateErrors("email.required"))
			.email(() => translateErrors("email.invalid")),
		// .matches(possibleEmailsRegexExpression, () => translateErrors("email.invalid")),
	};
	return Yup.object(allValidationRules);
};
