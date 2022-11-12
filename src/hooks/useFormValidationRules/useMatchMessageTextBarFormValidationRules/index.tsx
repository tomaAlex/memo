import * as Yup from "yup";

export const useMatchMessageTextBarFormValidationRules = () => {
	const validationRules = {
		messageText: Yup.string().min(1).max(5000),
	};
	return Yup.object(validationRules);
};
