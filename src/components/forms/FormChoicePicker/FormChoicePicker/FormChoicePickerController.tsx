import React from "react";
import { FlatListProps, View } from "react-native";
import { useFormikContext } from "formik";
import { IdLabeledData } from "types/index";
import FormFieldError from "../../FormFieldError";
import ModalSelector from "react-native-modal-selector-searchable";
import styles from "./FormChoicePicker.module.scss";

type ModalSelectorProps<RawData, Choice extends IdLabeledData<RawData>> = ModalSelector<Choice>["props"];

type TProps<D, RawData, Choice extends IdLabeledData<RawData>> = ModalSelectorProps<RawData, Choice> & {
	field: keyof D;
	renderItem: FlatListProps<Choice>["renderItem"];
	displayCurrentChoice?: (choice: RawData) => string;
};

function FormChoicePickerController<D, RawData, Choice extends IdLabeledData<RawData>>({
	field,
	keyExtractor = (item) => item.key,
	labelExtractor = (item) => item.label,
	displayCurrentChoice = (choice) => (choice as Object).toString(),
	...modalSelectorProps
}: TProps<D, RawData, Choice>) {
	const { handleChange, handleBlur, values, touched, errors } = useFormikContext<D>();
	const defaultOnChange = (choiceValue: Choice) => {
		handleChange(field)(choiceValue.label);
	};
	const onChange = modalSelectorProps.onChange ?? defaultOnChange;

	const searchPlaceholder = values[field] ? displayCurrentChoice(values[field] as RawData) : "Pickup a choice...";

	return (
		<View style={styles.container__picker}>
			<ModalSelector<Choice>
				{...{ keyExtractor, labelExtractor, onChange }}
				// the best approximation of onBlur
				onTouchStart={handleBlur(field as string)}
				// style={styles.container__picker__modal}
				selectStyle={styles.container__picker__modal}
				initValueTextStyle={styles.container__picker__modal__initValueTextStyle}
				initValue={searchPlaceholder}
				{...modalSelectorProps}
			/>
			<View style={styles.container__picker__error}>
				<FormFieldError touched={touched} field={field} errors={errors} />
			</View>
		</View>
	);
}

export default React.memo(FormChoicePickerController) as unknown as typeof FormChoicePickerController;
