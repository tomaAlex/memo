import { FormikProps } from "formik";
import { IdLabeledData } from "types/index";

type CountryChoicePickerChangeHandlerFunctionType = (option: IdLabeledData<string>) => void;

const getCountryChoicePickerChangeHandler = (
	handleChange: FormikProps<any>["handleChange"]
): CountryChoicePickerChangeHandlerFunctionType => {
	return ({ value }) => {
		handleChange("bankAccountCountry")(value);
	};
};

export default getCountryChoicePickerChangeHandler;
