import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useSignupHeightFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Errors" });
	const validationRules = {
		height: Yup.number()
			.min(54, () => translateErrors("height.tooShort"))
			.max(272, () => translateErrors("height.tooTall"))
			.required(() => translateErrors("height.required")),
	};
	return Yup.object(validationRules);
};
