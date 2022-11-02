import React from "react";
import { useFormikContext } from "formik";
import { FlatListProps, View } from "react-native";
import FormFieldError from "../FormFieldError";
import FormFieldMandatoryNote from "../FormFieldMandatoryNote";
import ModalSelector from "react-native-modal-selector-searchable";
import { IdLabeledData } from "types/index";

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
	const { handleChange, handleBlur, values, touched, errors } = useFormikContext<D>();
	const defaultOnChange = (choiceValue: Choice) => {
		handleChange(field)(choiceValue.label);
	};
	const onChange = modalSelectorProps.onChange ?? defaultOnChange;

	// currently not working, marked as a bug in the official library, see:
	// https://stackoverflow.com/questions/72999587/how-do-i-access-a-formik-contexts-validationschema
	// const isMandatory: boolean = validationSchema?.fields[field]._exclusive.required || false;

	const searchPlaceholder = values[field] ? displayCurrentChoice(values[field] as RawData) : "Pickup a choice...";

	return (
		<View style={{ flexDirection: "row", display: "flex", paddingBottom: 5 }}>
			{children && (
				<View style={{ alignSelf: "center", flex: 0.4 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						{isMandatory && <FormFieldMandatoryNote />}
						{children}
					</View>
				</View>
			)}
			<View style={{ flex: 1 }}>
				<ModalSelector<Choice>
					{...{ keyExtractor, labelExtractor, onChange }}
					// the best approximation of onBlur
					onTouchStart={handleBlur(field as string)}
					style={{ paddingLeft: 10, paddingRight: 10 }}
					initValue={searchPlaceholder}
					{...modalSelectorProps}
				/>
				<View style={{ alignSelf: "center" }}>
					<FormFieldError touched={touched} field={field} errors={errors} />
				</View>
			</View>
		</View>
	);
}

export default React.memo(FormChoicePicker) as unknown as typeof FormChoicePicker;
