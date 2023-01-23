import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import generatePicture from "../utils/generatePicture";
import FormImagePickerSupplierOption from "./FormImagePickerSupplierOption";
import styles from "./FormImagePickerSupplier.module.scss";

type TProps<D> = {
	field: keyof D;
	picturesLimit: number;
};

function FormImagePickerSupplier<D>({ field, picturesLimit }: TProps<D>) {
	const [t] = useTranslation("translation", { keyPrefix: "Components.Forms.FormImagePicker.FormImagePickerSupplier" });
	const { values } = useFormikContext<D>();
	const images = values[field] as string[];
	const remainingPictures = picturesLimit - images.length;

	const refRBSheet = useRef<RBSheet>(null);

	const fetchImageAndCloseRBSheet = (imageFetcher: () => Promise<string>) => {
		return async () => {
			const fetchedImage = await imageFetcher();
			refRBSheet.current?.close();
			return fetchedImage;
		};
	};

	const fetchCameraImage = fetchImageAndCloseRBSheet(() => generatePicture(true));
	const fetchGalleryImage = fetchImageAndCloseRBSheet(() => generatePicture(false));

	const bringUpRBSheet = () => {
		const canBringUpRBSheet = remainingPictures > 0;
		if (!canBringUpRBSheet) {
			return;
		}
		refRBSheet.current?.open();
	};

	return (
		<TouchableOpacity style={styles.container} onPress={bringUpRBSheet}>
			<Text style={styles.container__caption}>{t("remainingPicturesNotice", { count: 1 })}</Text>
			{/* https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148 */}
			{/* @ts-ignore */}
			<RBSheet
				ref={refRBSheet}
				height={100}
				closeOnDragDown
				closeOnPressMask
				keyboardAvoidingViewEnabled
				customStyles={{
					container: styles.container__picker,
				}}
			>
				<View style={styles.container__picker__container}>
					<FormImagePickerSupplierOption field={field} caption={"Camera"} fetchImage={fetchCameraImage} />
					<FormImagePickerSupplierOption field={field} caption={"Gallery"} fetchImage={fetchGalleryImage} />
				</View>
			</RBSheet>
		</TouchableOpacity>
	);
}

export default React.memo(FormImagePickerSupplier) as unknown as typeof FormImagePickerSupplier;
