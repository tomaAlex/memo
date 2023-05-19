import React from "react";
import { useFormikContext } from "formik";
import { Text, TouchableOpacity } from "react-native";
import styles from "./FormAnimatedImagePickerSupplierBottomSheet.module.scss";

type TProps<D> = {
	field: keyof D;
	caption: string;
	fetchImage: () => Promise<string>;
};

function FormAnimatedImagePickerSupplierOption<D>({ field, caption, fetchImage }: TProps<D>) {
	const { setFieldValue, values } = useFormikContext<D>();
	const images = values[field] as string[];

	const saveImage = (imageToSave: string) => {
		const newImages = [...images, imageToSave];
		setFieldValue(field as string, newImages);
	};

	const fetchAndSaveImage = async () => {
		const image = await fetchImage();
		saveImage(image);
	};

	return (
		<TouchableOpacity style={styles.container__picker__option} onPress={fetchAndSaveImage}>
			<Text style={styles.container__picker__option__caption}>{caption}</Text>
		</TouchableOpacity>
	);
}

export default React.memo(
	FormAnimatedImagePickerSupplierOption
) as unknown as typeof FormAnimatedImagePickerSupplierOption;
