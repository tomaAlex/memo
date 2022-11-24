import React from "react";
import { View } from "react-native";
import FormImagePickerLabel from "./FormImagePickerLabel";
import FormImagePickerController from "./FormImagePickerController";
import styles from "./FormImagePicker.module.scss";

type TProps<D> = {
	field: keyof D;
	picturesLimit?: number;
	isMandatory?: boolean;
	children?: React.ReactNode;
};

function FormImagePicker<D>({ field, isMandatory, picturesLimit = 9, children }: TProps<D>) {
	return (
		<View style={styles.container}>
			<FormImagePickerLabel {...{ children, isMandatory }} />
			<FormImagePickerController {...{ field, picturesLimit }} />
		</View>
	);
}

export default React.memo(FormImagePicker) as unknown as typeof FormImagePicker;
