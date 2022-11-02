import * as Yup from "yup";
import { Country, State } from "country-state-list";
import { useTranslation } from "react-i18next";

export const useSignupDetailsFormValidationRules = () => {
	const [translateErrors] = useTranslation("translation", { keyPrefix: "Screens.Signup.Forms.Details.Errors" });
	const allValidationRules = {
		job: Yup.string().max(100, () => translateErrors("job.tooLong")),
		school: Yup.string().max(100, () => translateErrors("school.tooLong")),
		description: Yup.string().max(1000, () => translateErrors("description.tooLong")),
		locationCountry: Yup.string().oneOf(Country.getAllCountries().map((country) => country.name)),
		locationState: Yup.string()
			.oneOf(State.getAllStates().map((state) => state.name))
			.when("locationCountry", {
				is: undefined,
				then: Yup.string().notRequired(),
				otherwise: Yup.string().required(() => translateErrors("location.state.required")),
			}),
		locationCity: Yup.string()
			.min(2, () => translateErrors("location.city.tooShort"))
			.max(85, () => translateErrors("location.city.tooLong"))
			.when("locationCountry", {
				is: undefined,
				then: Yup.string().notRequired(),
				otherwise: Yup.string().required(() => translateErrors("location.city.required")),
			}),
	};
	return Yup.object(allValidationRules);
};
