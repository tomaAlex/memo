import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useSearchFiltersFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Feed.SearchFiltersModal.Form.Errors",
	});
	const allValidationRules = {
		age: Yup.array()
			.of(Yup.number())
			.min(2, () => translateErrors("age.tooShort"))
			.max(2, () => translateErrors("age.tooLong"))
			.required(() => translateErrors("age.required")),
		distance: Yup.number()
			.min(1, () => translateErrors("distance.tooShort"))
			.max(5000, () => translateErrors("distance.tooLong"))
			.required(() => translateErrors("distance.required")),
		likesOnly: Yup.boolean().required(() => translateErrors("likesOnly.required")),
	};
	return Yup.object(allValidationRules);
};
