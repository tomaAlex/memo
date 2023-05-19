import React, { useRef } from "react";
import { View } from "react-native";
import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { useFormikContext } from "formik";
import FormFieldError from "../FormFieldError";
import FormAnimatedImagePickerSlide from "./FormAnimatedImagePickerSlide";
import FormAnimatedImagePickerSupplier from "./FormAnimatedImagePickerSupplier";
import styles from "./FormAnimatedImagePicker.module.scss";
import RBSheet from "react-native-raw-bottom-sheet";
import FormAnimatedImagePickerSupplierBottomSheet from "./FormAnimatedImagePickerSupplierBottomSheet";

type TProps<D> = {
	field: keyof D;
	picturesLimit?: number;
};

function FormAnimatedImagePickerController<D>({ field, picturesLimit = 9 }: TProps<D>) {
	const { setFieldValue, handleBlur, values, touched, errors } = useFormikContext<D>();
	const images = values[field] as string[];
	const refRBSheet = useRef<RBSheet>(null);

	const updateImages = (updatedImages: string[]) => {
		setFieldValue(field as string, updatedImages);
	};

	const removeImage = (imageToRemoveIndex: number) => {
		const clearedImages = [...images];
		clearedImages.splice(imageToRemoveIndex, 1);
		updateImages(clearedImages);
	};

	return (
		<View style={styles.container__picker}>
			<NestableScrollContainer style={styles.container__picker__carouselContainer}>
				<NestableDraggableFlatList
					// numColumns={2}
					// horizontal={true}
					// the best approximation of onBlur
					onTouchEnd={handleBlur(field as string)}
					style={styles.container__picker__carouselContainer__carousel}
					data={images}
					renderItem={({ item: imageSource, getIndex, drag, isActive }) => {
						const index = getIndex() as number;
						return (
							<FormAnimatedImagePickerSlide
								isImageUri
								key={index}
								onRemove={() => removeImage(index)}
								{...{ drag, imageSource, isActive }}
							/>
						);
					}}
					keyExtractor={(imageSource) => imageSource}
					ListFooterComponent={() => <FormAnimatedImagePickerSupplier {...{ field, picturesLimit, refRBSheet }} />}
					onDragEnd={({ data: updatedImages }) => updateImages(updatedImages)}
					ItemSeparatorComponent={() => (
						<View style={styles.container__picker__carouselContainer__carousel__separator} />
					)}
				/>
			</NestableScrollContainer>
			<View style={styles.container__picker__carouselContainer__error}>
				<FormFieldError {...{ touched, field, errors }} />
			</View>
			<FormAnimatedImagePickerSupplierBottomSheet {...{ field, refRBSheet }} />
		</View>
	);
}

export default React.memo(FormAnimatedImagePickerController) as unknown as typeof FormAnimatedImagePickerController;
