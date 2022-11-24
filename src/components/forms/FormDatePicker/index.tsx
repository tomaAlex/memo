import React, { ComponentProps } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormDatePickerLabel from "./FormDatePickerLabel";
import styles from "./FormDatePicker.module.scss";
import FormDatePickerController from "./FormDatePickerController";

type DateTimePickerProps = ComponentProps<typeof DateTimePicker>;

type TProps<D> = Partial<DateTimePickerProps> & {
	field: keyof D;
	isMandatory?: boolean;
	children?: React.ReactNode;
};

function FormDatePicker<D>({ field, isMandatory, children, ...pickerInputProps }: TProps<D>) {
	return (
		<View style={styles.container}>
			<FormDatePickerLabel {...{ children, isMandatory }} />
			<FormDatePickerController {...{ field, ...pickerInputProps }} />
		</View>
	);
}

export default React.memo(FormDatePicker) as unknown as typeof FormDatePicker;
