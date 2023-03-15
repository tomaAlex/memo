import React from "react";
import { useTranslation } from "react-i18next";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormSwitchInput from "components/forms/FormSwitchInput";
import styles from "./MatchReportingSectionFormSwitchInput.module.scss";
import { getFieldTranslations } from "./utils";
import { Text } from "react-native";

type TProps = {
	field: string;
};

const MatchReportingSectionFormSwitchInput = ({ field }: TProps) => {
	const [translateLabelDetails] = useTranslation("translation", {
		keyPrefix: "Screens.Main.MatchChat.MatchChatProfilePreview.MatchReportingSection.ReportForm.Labels",
	});
	const [caption, description] = getFieldTranslations(translateLabelDetails, field);

	return (
		<>
			<FormSwitchInput {...{ field }}>
				<FormFieldLabel style={styles.container__form__label} label={caption} />
			</FormSwitchInput>
			<Text>{description}</Text>
		</>
	);
};

export default React.memo(MatchReportingSectionFormSwitchInput);
