import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useSignupWorkFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Errors" });
	const allValidationRules = {
		job: Yup.string().max(100, () => translateErrors("job.tooLong")),
	};
	return Yup.object(allValidationRules);
};
