import { TFunction } from "i18next";

export const getFieldTranslations = (
	translateLabelDetails: TFunction,
	field: string
): [caption: string, description: string] => {
	const fieldTranslationsKey = field.charAt(0).toUpperCase() + field.slice(1);
	return [
		translateLabelDetails(`${fieldTranslationsKey}.caption`),
		translateLabelDetails(`${fieldTranslationsKey}.description`),
	];
};
