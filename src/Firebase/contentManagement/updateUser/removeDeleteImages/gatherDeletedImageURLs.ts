const gatherDeletedImageURLs = (previousUserImages: string[], newUserImages: string[]): string[] => {
	return previousUserImages.filter((previousUserImage) => !newUserImages.includes(previousUserImage));
};

export default gatherDeletedImageURLs;
