import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import FormFieldError from "../FormFieldError";
import Carousel from "components/Carousel";
import FormImagePickerSlide from "./FormImagePickerSlide";
import FormImagePickerSupplier from "./FormImagePickerSupplier";
import styles from "./FormImagePicker.module.scss";

type TProps<D> = {
	field: keyof D;
	picturesLimit?: number;
};

function FormImagePickerController<D>({ field, picturesLimit = 9 }: TProps<D>) {
	const { setFieldValue, handleBlur, values, touched, errors } = useFormikContext<D>();
	const images = values[field] as string[];

	const removeImage = (imageToRemoveIndex: number) => {
		const clearedImages = [...images];
		clearedImages.splice(imageToRemoveIndex, 1);
		setFieldValue(field as string, clearedImages);
	};

	return (
		<View style={styles.container__picker}>
			<View style={styles.container__picker__carouselContainer}>
				<Carousel
					// the best approximation of onBlur
					onTouchEnd={handleBlur(field as string)}
					style={styles.container__picker__carouselContainer__carousel}
				>
					{images.length > 0 &&
						images.map((imageSource, index) => {
							return (
								<FormImagePickerSlide
									isImageUri
									key={index}
									imageSource={imageSource}
									onRemove={() => removeImage(index)}
								/>
							);
						})}
					<FormImagePickerSupplier field={field} picturesLimit={picturesLimit} />
				</Carousel>
			</View>
			<View style={styles.container__picker__carouselContainer__error}>
				<FormFieldError touched={touched} field={field} errors={errors} />
			</View>
		</View>
	);
}

export default React.memo(FormImagePickerController) as unknown as typeof FormImagePickerController;
