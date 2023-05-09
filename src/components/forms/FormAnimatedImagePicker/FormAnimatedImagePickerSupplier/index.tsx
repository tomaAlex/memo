import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./FormAnimatedImagePickerSupplier.module.scss";
import { PlusIcon } from "icons";

type TProps<D> = {
	field: keyof D;
	picturesLimit: number;
	refRBSheet: React.RefObject<RBSheet>;
};

function FormAnimatedImagePickerSupplier<D>({ field, picturesLimit, refRBSheet }: TProps<D>) {
	const [t] = useTranslation("translation", {
		keyPrefix: "Components.Forms.FormAnimatedImagePicker.FormAnimatedImagePickerSupplier",
	});
	const { values } = useFormikContext<D>();
	const images = values[field] as string[];
	const remainingPictures = picturesLimit - images.length;

	const bringUpRBSheet = () => {
		const canBringUpRBSheet = remainingPictures > 0;
		if (!canBringUpRBSheet) {
			return;
		}
		refRBSheet.current?.open();
	};

	return (
		<TouchableOpacity style={styles.container} onPress={bringUpRBSheet}>
			<View style={styles.container__iconAndCaptionContainer}>
				<PlusIcon fill="#F10065" style={styles.container__iconAndCaptionContainer__icon} />
				<Text style={styles.container__iconAndCaptionContainer__caption}>
					{t("remainingPicturesNotice", { count: remainingPictures })}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

export default React.memo(FormAnimatedImagePickerSupplier) as unknown as typeof FormAnimatedImagePickerSupplier;
