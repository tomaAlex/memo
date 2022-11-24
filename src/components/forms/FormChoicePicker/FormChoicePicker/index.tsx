import React from "react";
import { FlatListProps, View } from "react-native";
import ModalSelector from "react-native-modal-selector-searchable";
import { IdLabeledData } from "types/index";
import styles from "./FormChoicePicker.module.scss";
import FormChoicePickerLabel from "./FormChoicePickerLabel";
import FormChoicePickerController from "./FormChoicePickerController";

type ModalSelectorProps<RawData, Choice extends IdLabeledData<RawData>> = ModalSelector<Choice>["props"];

type TProps<D, RawData, Choice extends IdLabeledData<RawData>> = ModalSelectorProps<RawData, Choice> & {
	field: keyof D;
	isMandatory?: boolean;
	renderItem: FlatListProps<Choice>["renderItem"];
	displayCurrentChoice?: (choice: RawData) => string;
	children?: React.ReactNode;
};

function FormChoicePicker<D, RawData, Choice extends IdLabeledData<RawData>>({
	field,
	isMandatory,
	children,
	keyExtractor = (item) => item.key,
	labelExtractor = (item) => item.label,
	displayCurrentChoice = (choice) => (choice as Object).toString(),
	...modalSelectorProps
}: TProps<D, RawData, Choice>) {
	// currently not working, marked as a bug in the official library, see:
	// https://stackoverflow.com/questions/72999587/how-do-i-access-a-formik-contexts-validationschema
	// const isMandatory: boolean = validationSchema?.fields[field]._exclusive.required || false;

	return (
		<View style={styles.container}>
			<FormChoicePickerLabel {...{ children, isMandatory }} />
			<FormChoicePickerController
				{...{ field, keyExtractor, labelExtractor, displayCurrentChoice, ...modalSelectorProps }}
			/>
		</View>
	);
}

export default React.memo(FormChoicePicker) as unknown as typeof FormChoicePicker;
