import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import tutorialStyles from "../../Tutorial.module.scss";
import styles from "./TutorialNote2.module.scss";
import { HourglassIcon } from "icons/index";

const TutorialNote2 = () => {
	// const [translateTutorialLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial" });
	const [translateTutorialNoteLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial.Note2" });

	return (
		<View style={styles.container}>
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__title}>{translateTutorialNoteLabels("title")}</Text>
			</View>
			<HourglassIcon style={tutorialStyles.container__icon} width={200} height={200} />
		</View>
	);
};

export default React.memo(TutorialNote2);
