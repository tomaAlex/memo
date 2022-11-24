import React, { ComponentProps, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useFormikContext } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormFieldError from "../FormFieldError";
import { getFormattedDateString } from "utils/index";
import styles from "./FormDatePicker.module.scss";

type DateTimePickerProps = ComponentProps<typeof DateTimePicker>;

type TProps<D> = Partial<DateTimePickerProps> & {
	field: keyof D;
};

function FormDatePickerController<D>({ field, ...pickerInputProps }: TProps<D>) {
	const { handleChange, handleBlur, values, touched, errors } = useFormikContext<D>();
	const [showPicker, setShowPicker] = useState(false);
	const currentlyPickedDateString = values[field] ? (values[field] as string) : new Date().toDateString();
	const currentlyPickedDate = new Date(currentlyPickedDateString);

	const updateDate: DateTimePickerProps["onChange"] = (event, date) => {
		setShowPicker(false);
		if (!date) return; // nothing to update, leave the date as before
		handleChange(field)(date.toString());
	};

	return (
		<View style={styles.container__picker}>
			<View>
				{Platform.OS === "android" && (
					<TouchableOpacity style={styles.container__picker__modal} onPress={() => setShowPicker(true)}>
						<Text style={styles.container__picker__modal__text}>{getFormattedDateString(currentlyPickedDate)}</Text>
					</TouchableOpacity>
				)}
				{(showPicker || Platform.OS === "ios") && (
					<DateTimePicker
						// the best approximation of `onBlur` for the date picker
						onTouchEnd={handleBlur(field as string)}
						style={styles.container__picker__modal__date}
						value={currentlyPickedDate}
						onChange={updateDate}
						{...pickerInputProps}
					/>
				)}
			</View>
			<View style={styles.container__picker__error}>
				<FormFieldError touched={touched} field={field} errors={errors} />
			</View>
		</View>
	);
}

export default React.memo(FormDatePickerController) as unknown as typeof FormDatePickerController;
