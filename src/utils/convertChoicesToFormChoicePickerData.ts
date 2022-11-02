import { IdLabeledData } from "types/index";
import { getEnumValues } from "./getEnumValues";

export const convertChoicesToFormChoicePickerData = <Choices extends Object>(
	choices: Choices,
	getChoiceLabel = (choice: Choices) => choice.toString()
): IdLabeledData<Choices>[] => {
	const choiceValues = getEnumValues(choices);
	return choiceValues.map((choiceValue, index) => ({
		key: index,
		label: getChoiceLabel(choiceValue as Choices),
		value: choiceValue as Choices,
	}));
};
