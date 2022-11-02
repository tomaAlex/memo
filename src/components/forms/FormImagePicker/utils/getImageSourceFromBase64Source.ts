import { ImageProps } from "react-native";

const getImageSourceFromUriSource = (uriSource: string): ImageProps["source"] => {
	return { uri: uriSource };
};

export default getImageSourceFromUriSource;
