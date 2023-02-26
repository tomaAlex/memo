import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { useFormikContext } from "formik";
import FormFieldError from "../FormFieldError";
import styles from "./FormDateSelector.module.scss";

type TProps<D> = {
	field: keyof D;
	child: JSX.Element;
};

function FormDateSelector<D>({ field, child }: TProps<D>) {
	const { values, touched, errors, setFieldValue } = useFormikContext<D>();
	const [open, setOpen] = useState<boolean>(false);

	return (
		<View>
			<TouchableOpacity
				onPress={() => {
					setOpen(true);
				}}
			>
				{child}
			</TouchableOpacity>
			<DatePicker
				theme="light"
				date={values[field] as Date}
				open={open}
				modal
				mode="date"
				onCancel={() => setOpen(false)}
				onConfirm={(date) => {
					setFieldValue(field as string, date, true);
					setOpen(false);
				}}
			/>
			<View style={styles.error}>
				<FormFieldError touched={touched} field={field} errors={errors} />
			</View>
		</View>
	);
}

export default React.memo(FormDateSelector) as unknown as typeof FormDateSelector;
