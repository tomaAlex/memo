import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormSwitchInput from "components/forms/FormSwitchInput";
import styles from "./MatchReportingSectionFormSwitchInput.module.scss";
import { getFieldTranslations } from "./utils";

type TProps = {
	field: string;
};

const MatchReportingSectionFormSwitchInput = ({ field }: TProps) => {
	const [translateLabelDetails] = useTranslation("translation", {
		keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection.ReportForm.Labels",
	});
	const [caption, description] = getFieldTranslations(translateLabelDetails, field);

	return (
		<View style={styles.container}>
			<FormSwitchInput {...{ field }}>
				<FormFieldLabel style={styles.container__switchInput__label} label={caption} />
			</FormSwitchInput>
			<Text style={styles.container__description}>{description}</Text>
		</View>
	);
};

export default React.memo(MatchReportingSectionFormSwitchInput);
