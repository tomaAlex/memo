const isImageNotUploaded = (possiblyUploadedImage: string): boolean => {
	return !possiblyUploadedImage.startsWith("https://");
};

export default isImageNotUploaded;
