import React from "react";
import { Alert, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import getImageSourceFromUriSource from "./utils/getImageSourceFromBase64Source";
import styles from "./FormAnimatedImagePicker.module.scss";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { useTranslation } from "react-i18next";

type TProps<IsImageUri extends boolean> = {
	isImageUri: IsImageUri;
	imageSource: IsImageUri extends true ? string : ImageSourcePropType;
	onRemove: () => void;
	drag: () => void;
	isActive: boolean;
};

function FormAnimatedImagePickerSlide<IsImageUri extends boolean>({
	isImageUri,
	imageSource,
	onRemove,
	drag,
	isActive,
}: TProps<IsImageUri>) {
	const image = (isImageUri ? getImageSourceFromUriSource(imageSource as string) : imageSource) as ImageSourcePropType;
	const [translateDeletionNotes] = useTranslation("translation", {
		keyPrefix: "Components.Forms.FormAnimatedImagePicker.FormAnimatedImagePickerDeletion",
	});
	return (
		<ScaleDecorator>
			<TouchableOpacity
				disabled={isActive}
				onPress={() => {
					Alert.alert(translateDeletionNotes("title"), translateDeletionNotes("caption"), [
						{
							text: translateDeletionNotes("delete"),
							style: "destructive",
							onPress: onRemove,
						},
						{ text: translateDeletionNotes("cancel"), style: "cancel" },
					]);
				}}
				onLongPress={drag}
				style={[styles.container__picker__carouselContainer__carousel__imageSlide, { opacity: isActive ? 0.5 : 1 }]}
			>
				<Image style={styles.container__picker__carouselContainer__carousel__imageSlide__image} source={image} />
			</TouchableOpacity>
		</ScaleDecorator>
	);
}

export default React.memo(FormAnimatedImagePickerSlide) as unknown as typeof FormAnimatedImagePickerSlide;
