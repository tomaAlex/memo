import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import getImageSourceFromUriSource from "./utils/getImageSourceFromBase64Source";

type TProps<IsImageUri extends boolean> = {
	isImageUri: IsImageUri;
	imageSource: IsImageUri extends true ? string : ImageSourcePropType;
	onRemove: () => void;
};

function FormImagePickerSlide<IsImageUri extends boolean>({ isImageUri, imageSource, onRemove }: TProps<IsImageUri>) {
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Components.Forms.FormImagePicker.FormImagePickerSlide",
	});
	const image = (isImageUri ? getImageSourceFromUriSource(imageSource as string) : imageSource) as ImageSourcePropType;
	return (
		<View style={{ flex: 1 }}>
			<Image style={{ flex: 1 }} source={image} />
			<TouchableOpacity onPress={onRemove} style={{ backgroundColor: "red" }}>
				<Text>{translateLabels("delete")}</Text>
			</TouchableOpacity>
		</View>
	);
}

export default React.memo(FormImagePickerSlide) as unknown as typeof FormImagePickerSlide;
