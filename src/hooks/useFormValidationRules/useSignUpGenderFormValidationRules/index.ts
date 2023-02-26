import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { getEnumValues } from "utils";
import { Gender } from "types/index";

export const useSignupGenderFormValidationRules = () => {
    const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Signup.Forms.Identification.Errors",
	});

    const validationRules = {
        gender: Yup.string()
			.oneOf(getEnumValues(Gender))
			.required(() => translateErrors("gender.required")),
    }
    return Yup.object(validationRules);
}