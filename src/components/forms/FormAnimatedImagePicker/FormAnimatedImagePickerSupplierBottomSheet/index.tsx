import React from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import FormAnimatedImagePickerSupplierOption from "./FormAnimatedImagePickerSupplierOption";
import styles from "./FormAnimatedImagePickerSupplierBottomSheet.module.scss";
import generatePicture from "../utils/generatePicture";

type TProps<D> = {
	field: keyof D;
	refRBSheet: React.RefObject<RBSheet>;
};

function FormAnimatedImagePickerSupplierBottomSheet<D>({ field, refRBSheet }: TProps<D>) {
	const fetchImageAndCloseRBSheet = (imageFetcher: () => Promise<string>) => {
		return async () => {
			const fetchedImage = await imageFetcher();
			refRBSheet.current?.close();
			return fetchedImage;
		};
	};

	const fetchCameraImage = fetchImageAndCloseRBSheet(() => generatePicture(true));
	const fetchGalleryImage = fetchImageAndCloseRBSheet(() => generatePicture(false));

	return (
		// https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148
		// @ts-ignore
		<RBSheet
			ref={refRBSheet}
			height={100}
			closeOnDragDown
			closeOnPressMask
			keyboardAvoidingViewEnabled
			customStyles={{
				container: styles.container,
			}}
		>
			<View style={styles.container__picker}>
				<FormAnimatedImagePickerSupplierOption field={field} caption={"Camera"} fetchImage={fetchCameraImage} />
				<FormAnimatedImagePickerSupplierOption field={field} caption={"Gallery"} fetchImage={fetchGalleryImage} />
			</View>
		</RBSheet>
	);
}

export default React.memo(
	FormAnimatedImagePickerSupplierBottomSheet
) as unknown as typeof FormAnimatedImagePickerSupplierBottomSheet;
