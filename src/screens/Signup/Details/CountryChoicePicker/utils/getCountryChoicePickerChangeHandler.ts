import { FormikProps } from "formik";
import { IdLabeledData } from "types/index";

type CountryChoicePickerChangeHandlerFunctionType = (option: IdLabeledData<string>) => void;

const getCountryChoicePickerChangeHandler = (
	handleChange: FormikProps<any>["handleChange"],
	setSelectedCountryCode: (selectedCountryCode: string) => void
): CountryChoicePickerChangeHandlerFunctionType => {
	return ({ value, key }) => {
		handleChange("locationCountry")(value);
		handleChange("locationState")("");
		handleChange("locationCity")("");
		setSelectedCountryCode(key as string);
	};
};

export default getCountryChoicePickerChangeHandler;
