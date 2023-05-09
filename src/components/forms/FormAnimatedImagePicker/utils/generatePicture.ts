import { PROFILE_HEIGHT, PROFILE_WIDTH } from "constants";
import ImagePicker from "react-native-image-crop-picker";

const generatePicture = async (
	camera = false,
	pictureWidth = PROFILE_WIDTH,
	pictureHeight = PROFILE_HEIGHT
): Promise<string> => {
	const { openCamera, openPicker } = ImagePicker;
	const imageFetchingMethod = camera ? openCamera : openPicker;
	const selectedImage = await imageFetchingMethod({
		mediaType: "photo",
		includeBase64: true,
		cropping: true,
		width: pictureWidth,
		height: pictureHeight,
	});
	const rawData = selectedImage.data as string;
	const encoding = selectedImage.mime;
	return `data:${encoding};base64,${rawData}`;
};

export default generatePicture;
