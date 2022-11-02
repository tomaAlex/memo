import React, { ComponentProps, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import { Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormFieldError from "./FormFieldError";
import FormFieldMandatoryNote from "./FormFieldMandatoryNote";

type DateTimePickerProps = ComponentProps<typeof DateTimePicker>;

type TProps<D> = Partial<DateTimePickerProps> & {
	field: keyof D;
	isMandatory?: boolean;
	children?: React.ReactNode;
};

function FormDatePicker<D>({ field, isMandatory, children, ...pickerInputProps }: TProps<D>) {
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
		<View style={{ flexDirection: "row", display: "flex", paddingBottom: 5 }}>
			{children && (
				<View style={{ alignSelf: "center", flex: 0.4 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						{isMandatory && <FormFieldMandatoryNote />}
						{children}
					</View>
				</View>
			)}
			<View style={{ display: "flex", flex: 1 }}>
				<View>
					{Platform.OS === "android" && (
						<TouchableOpacity onPress={() => setShowPicker(true)}>
							<Text style={{ alignSelf: "center" }}>{currentlyPickedDate.toLocaleDateString()}</Text>
						</TouchableOpacity>
					)}
					{(showPicker || Platform.OS === "ios") && (
						<DateTimePicker
							// the best approximation of `onBlur` for the date picker
							onTouchEnd={handleBlur(field as string)}
							style={{ alignSelf: "center", width: "100%" }}
							value={currentlyPickedDate}
							onChange={updateDate}
							{...pickerInputProps}
						/>
					)}
				</View>
				<View style={{ alignSelf: "center" }}>
					<FormFieldError touched={touched} field={field} errors={errors} />
				</View>
			</View>
		</View>
	);
}

export default React.memo(FormDatePicker) as unknown as typeof FormDatePicker;
