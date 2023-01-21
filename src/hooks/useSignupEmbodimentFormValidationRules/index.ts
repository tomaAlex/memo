import * as Yup from "yup";
import { Orientation } from "types/index";
import { getEnumValues } from "utils/index";
import { useTranslation } from "react-i18next";

export const useSignupEmbodimentFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Errors" });
	const validationRules = {
		height: Yup.number()
			.min(54, () => translateErrors("height.tooShort"))
			.max(272, () => translateErrors("height.tooTall"))
			.required(() => translateErrors("height.required")),
		orientation: Yup.string()
			.oneOf(getEnumValues(Orientation))
			.required(() => translateErrors("orientation.required")),
		photos: Yup.array()
			.min(1, () => translateErrors("photos.required"))
			.max(9, () => translateErrors("photos.tooMany"))
			.required(() => translateErrors("photos.required")),
	};
	return Yup.object(validationRules);
};
