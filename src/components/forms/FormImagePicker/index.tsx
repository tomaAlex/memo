import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import FormImagePickerSlide from "./FormImagePickerSlide";
import FormImagePickerSupplier from "./FormImagePickerSupplier";
import FormFieldError from "../FormFieldError";
import FormFieldMandatoryNote from "../FormFieldMandatoryNote";
import Carousel from "components/Carousel";

type TProps<D> = {
	field: keyof D;
	picturesLimit?: number;
	isMandatory?: boolean;
	children?: React.ReactNode;
};

function FormImagePicker<D>({ field, isMandatory, picturesLimit = 9, children }: TProps<D>) {
	const { setFieldValue, handleBlur, values, touched, errors } = useFormikContext<D>();
	const images = values[field] as string[];

	const removeImage = (imageToRemoveIndex: number) => {
		const clearedImages = [...images];
		clearedImages.splice(imageToRemoveIndex, 1);
		setFieldValue(field as string, clearedImages);
	};

	return (
		<View style={{ flex: 1, flexDirection: "row", display: "flex", paddingBottom: 5 }}>
			{children && (
				<View style={{ alignSelf: "center", flex: 0.4 }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						{isMandatory && <FormFieldMandatoryNote />}
						{children}
					</View>
				</View>
			)}
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1, borderWidth: 1, borderColor: "gray" }}>
					<Carousel
						// the best approximation of onBlur
						onTouchEnd={handleBlur(field as string)}
						style={{ flex: 1 }}
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
				<View style={{ alignSelf: "center" }}>
					<FormFieldError touched={touched} field={field} errors={errors} />
				</View>
			</View>
		</View>
	);
}

export default React.memo(FormImagePicker) as unknown as typeof FormImagePicker;
