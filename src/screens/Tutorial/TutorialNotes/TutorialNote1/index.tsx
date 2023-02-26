import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import tutorialStyles from "../../Tutorial.module.scss";
import styles from "./TutorialNote1.module.scss";
import { HandHeartIcon } from "icons/index";

const TutorialNote1 = () => {
	// const [translateTutorialLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial" });
	const [translateTutorialNoteLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial.Note1" });

	return (
		<View style={styles.container}>
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__title}>{translateTutorialNoteLabels("title")}</Text>
			</View>
			<HandHeartIcon style={tutorialStyles.container__icon} width={150} height={150} color="#fff" fill="#fff" />
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__title}>{translateTutorialNoteLabels("content")}</Text>
			</View>
		</View>
	);
};

export default React.memo(TutorialNote1);
