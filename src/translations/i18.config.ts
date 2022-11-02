import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ro } from ".";

const resources = {
	en: en,
	ro: ro,
};

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources,
	fallbackLng: "en", // default language
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
