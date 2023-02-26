import { useTranslation } from "react-i18next";
import { Orientation } from "types";
import { getEnumValues } from "utils";
import * as Yup from "yup";

export const useSignUpOrientationFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Embodiment.Errors" });

	const validationRules = {
		orientation: Yup.string()
			.oneOf(getEnumValues(Orientation))
			.required(() => translateErrors("orientation.required")),
	};

	return Yup.object(validationRules);
};
