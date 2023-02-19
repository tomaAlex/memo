import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useSignupPhotosFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Errors" });
	const validationRules = {
		photos: Yup.array()
			.min(1, () => translateErrors("photos.required"))
			.max(9, () => translateErrors("photos.tooMany"))
			.required(() => translateErrors("photos.required")),
	};
	return Yup.object(validationRules);
};
