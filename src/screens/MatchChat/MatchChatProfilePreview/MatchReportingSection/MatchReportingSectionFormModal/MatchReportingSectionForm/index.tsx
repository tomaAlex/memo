import { Formik } from "formik";
import React, { useContext } from "react";
import { getOnSubmitHandler } from "./utils";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, View } from "react-native";
import styles from "./MatchReportingSectionForm.module.scss";
import MatchChatProfilePreviewContext from "screens/MatchChat/MatchChatProfilePreview/MatchChatProfilePreviewContext";
import { useMatchReportingSectionFormValidationRules } from "hooks/useFormValidationRules/useMatchReportingSectionFormValidationRules";
import MatchReportingSectionFormSwitchInput from "./MatchReportingSectionFormSwitchInput";
import FormSubmitButton from "components/forms/FormSubmitButton";

const MatchReportingSectionForm = () => {
	const { userToReportId, historyMatchId } = useContext(MatchChatProfilePreviewContext);
	const [translateErrors] = useTranslation("translation", {
		keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection.ReportForm.Errors",
	});
	const matchReportingSectionSchema = useMatchReportingSectionFormValidationRules();

	return (
		<Formik
			validationSchema={matchReportingSectionSchema}
			initialValues={{
				behavior: false,
				scam: false,
				harassment: false,
				safety: false,
				guidelines: false,
				misrepresentation: false,
				offTopic: false,
				other: false,
			}}
			onSubmit={getOnSubmitHandler(translateErrors, userToReportId, historyMatchId)}
		>
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.container__form}>
					<MatchReportingSectionFormSwitchInput field="behavior" />
					<MatchReportingSectionFormSwitchInput field="scam" />
					<MatchReportingSectionFormSwitchInput field="harassment" />
					<MatchReportingSectionFormSwitchInput field="safety" />
					<MatchReportingSectionFormSwitchInput field="guidelines" />
					<MatchReportingSectionFormSwitchInput field="misrepresentation" />
					<MatchReportingSectionFormSwitchInput field="offTopic" />
					<MatchReportingSectionFormSwitchInput field="other" />
					<FormSubmitButton />
				</ScrollView>
			</SafeAreaView>
		</Formik>
	);
};

export default React.memo(MatchReportingSectionForm);
