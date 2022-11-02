import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import generatePicture from "../utils/generatePicture";
import FormImagePickerSupplierOption from "./FormImagePickerSupplierOption";

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
		<TouchableOpacity style={{ flex: 1, margin: 5, backgroundColor: "gray" }} onPress={bringUpRBSheet}>
			<Text style={{ alignSelf: "center", marginTop: "50%", fontSize: 11, fontWeight: "bold", color: "white" }}>
				{t("remainingPicturesNotice", { count: remainingPictures })}
			</Text>
			{/* https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148 */}
			{/* @ts-ignore */}
			<RBSheet
				ref={refRBSheet}
				height={100}
				closeOnDragDown
				closeOnPressMask
				keyboardAvoidingViewEnabled
				customStyles={{
					container: {
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
					},
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						flex: 1,
					}}
				>
					<FormImagePickerSupplierOption field={field} caption={"Camera"} fetchImage={fetchCameraImage} />
					<FormImagePickerSupplierOption field={field} caption={"Gallery"} fetchImage={fetchGalleryImage} />
				</View>
			</RBSheet>
		</TouchableOpacity>
	);
}

export default React.memo(FormImagePickerSupplier) as unknown as typeof FormImagePickerSupplier;
