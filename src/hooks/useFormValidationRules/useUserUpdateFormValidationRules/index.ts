import { useSignupEmbodimentFormValidationRules } from "hooks/useSignupEmbodimentFormValidationRules";
import { useSignupDetailsFormValidationRules } from "../useSignupDetailsFormValidationRules";
import { useSignupIdentificationFormValidationRules } from "../useSignupIdentificationFormValidationRules";

export const useUserUpdateFormValidationRules = () => {
	const identificationSchema = useSignupIdentificationFormValidationRules();
	const detailsSchema = useSignupDetailsFormValidationRules();
	const embodimentSchema = useSignupEmbodimentFormValidationRules();
	return identificationSchema.concat(detailsSchema).concat(embodimentSchema);
};
