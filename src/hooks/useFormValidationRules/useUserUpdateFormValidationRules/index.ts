import * as Yup from "yup";
import { useSignupEmbodimentFormValidationRules } from "hooks/useSignupEmbodimentFormValidationRules";
import { useSignupDetailsFormValidationRules } from "../useSignupDetailsFormValidationRules";
import { useSignupIdentificationFormValidationRules } from "../useSignupIdentificationFormValidationRules";

export const useUserUpdateFormValidationRules = () => {
	const identificationSchema = useSignupIdentificationFormValidationRules();
	const detailsSchema = useSignupDetailsFormValidationRules();
	const embodimentSchema = useSignupEmbodimentFormValidationRules();
	const additionalFieldsSchema = Yup.object({
		hasInstantMatchingOn: Yup.boolean().required(),
	});
	return identificationSchema.concat(detailsSchema).concat(embodimentSchema).concat(additionalFieldsSchema);
};
