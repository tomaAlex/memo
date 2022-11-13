import getImageName from "./getImageName";

const getFullImagePath = async (imageSubPath?: string, imageName?: string): Promise<string> => {
	const baseImagePath = "images/";
	const fullImageSubpath = imageSubPath ? `${imageSubPath}/` : "";
	const namelessImagePath = baseImagePath + fullImageSubpath;
	const chosenImageName = await getImageName(namelessImagePath, imageName);
	return namelessImagePath + chosenImageName + ".png";
};

export default getFullImagePath;
