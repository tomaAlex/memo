import React from "react";
import { View } from "react-native";
import FormAnimatedImagePickerLabel from "./FormAnimatedImagePickerLabel";
import FormAnimatedImagePickerController from "./FormAnimatedImagePickerController";
import styles from "./FormAnimatedImagePicker.module.scss";

type TProps<D> = {
	field: keyof D;
	picturesLimit?: number;
	isMandatory?: boolean;
	children?: React.ReactNode;
};

function FormAnimatedImagePicker<D>({ field, isMandatory, picturesLimit = 9, children }: TProps<D>) {
	return (
		<View style={styles.container}>
			<FormAnimatedImagePickerLabel {...{ children, isMandatory }} />
			<FormAnimatedImagePickerController {...{ field, picturesLimit }} />
		</View>
	);
}

export default React.memo(FormAnimatedImagePicker) as unknown as typeof FormAnimatedImagePicker;
