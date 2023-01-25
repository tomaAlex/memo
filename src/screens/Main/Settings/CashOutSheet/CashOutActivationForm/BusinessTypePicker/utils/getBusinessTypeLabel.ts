import { BusinessType } from "types/index";

const getBusinessTypeLabel = (businessType: BusinessType): string => {
	// Split the string into an array of words
	const words = businessType.split("_");

	// Capitalize the first letter of each word
	const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1));

	// Join the words back into a single string, separated by spaces
	return capitalizedWords.join(" ");
};

export default getBusinessTypeLabel;
