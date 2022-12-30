import { FormikProps } from "formik";
import { IdLabeledData } from "types/index";

type CurrencyChoicePickerChangeHandlerFunctionType = (option: IdLabeledData<string>) => void;

const getCurrencyChoicePickerChangeHandler = (
	handleChange: FormikProps<any>["handleChange"]
): CurrencyChoicePickerChangeHandlerFunctionType => {
	return ({ value }) => {
		handleChange("currency")(value);
	};
};

export default getCurrencyChoicePickerChangeHandler;
