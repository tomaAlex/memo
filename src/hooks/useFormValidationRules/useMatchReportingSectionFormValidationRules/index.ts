import * as Yup from "yup";
// import { useTranslation } from "react-i18next";

export const useMatchReportingSectionFormValidationRules = () => {
	// const [translateErrors] = useTranslation("translation", {
	// 	keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection.ReportForm.Errors",
	// });
	const allValidationRules = {
		behavior: Yup.boolean(),
		scam: Yup.boolean(),
		harassment: Yup.boolean(),
		safety: Yup.boolean(),
		guidelines: Yup.boolean(),
		misrepresentation: Yup.boolean(),
		offTopic: Yup.boolean(),
		other: Yup.boolean(),
	};
	return Yup.object(allValidationRules);
};
