import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity, View } from "react-native";
import getImageSourceFromUriSource from "./utils/getImageSourceFromBase64Source";
import { BinIcon } from "icons/index";
import styles from "./FormImagePicker.module.scss";

type TProps<IsImageUri extends boolean> = {
	isImageUri: IsImageUri;
	imageSource: IsImageUri extends true ? string : ImageSourcePropType;
	onRemove: () => void;
};

function FormImagePickerSlide<IsImageUri extends boolean>({ isImageUri, imageSource, onRemove }: TProps<IsImageUri>) {
	const image = (isImageUri ? getImageSourceFromUriSource(imageSource as string) : imageSource) as ImageSourcePropType;
	return (
		<View style={styles.container__picker__carouselContainer__carousel__imageSlide}>
			<Image style={styles.container__picker__carouselContainer__carousel__imageSlide__image} source={image} />
			<TouchableOpacity
				onPress={onRemove}
				style={styles.container__picker__carouselContainer__carousel__imageSlide__bin}
			>
				<BinIcon width={30} height={30} />
			</TouchableOpacity>
		</View>
	);
}

export default React.memo(FormImagePickerSlide) as unknown as typeof FormImagePickerSlide;
