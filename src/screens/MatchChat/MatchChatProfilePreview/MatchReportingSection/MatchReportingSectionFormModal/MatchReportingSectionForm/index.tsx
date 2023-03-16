import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { getOnSubmitHandler } from "./utils";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView } from "react-native";
import styles from "./MatchReportingSectionForm.module.scss";
import MatchChatProfilePreviewContext from "screens/MatchChat/MatchChatProfilePreview/MatchChatProfilePreviewContext";
import { useMatchReportingSectionFormValidationRules } from "hooks/useFormValidationRules/useMatchReportingSectionFormValidationRules";
import MatchReportingSectionFormSwitchInput from "./MatchReportingSectionFormSwitchInput";
import MatchReportingSectionFormSubmitButton from "./MatchReportingSectionFormSubmitButton";
import { useNavigation } from "@react-navigation/native";
import { NavigationStackTypes, ScreenNames } from "types/index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type TProps = {
	closeForm: () => void;
};

const MatchReportingSectionForm = ({ closeForm }: TProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<NavigationStackTypes, ScreenNames.MatchChat>>();
	const { userToReportId, historyMatchId } = useContext(MatchChatProfilePreviewContext);
	const [isReporting, setIsReporting] = useState(false);
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
			onSubmit={getOnSubmitHandler(
				translateErrors,
				userToReportId,
				historyMatchId,
				setIsReporting,
				navigation,
				closeForm
			)}
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
					<MatchReportingSectionFormSubmitButton {...{ isReporting }} />
				</ScrollView>
			</SafeAreaView>
		</Formik>
	);
};

export default React.memo(MatchReportingSectionForm);
