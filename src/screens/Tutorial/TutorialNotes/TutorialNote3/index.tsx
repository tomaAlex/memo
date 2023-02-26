import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import tutorialStyles from "../../Tutorial.module.scss";
import styles from "./TutorialNote3.module.scss";
import { HandSwipeIcon } from "icons/index";

const TutorialNote3 = () => {
	// const [translateTutorialLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial" });
	const [translateTutorialNoteLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial.Note3" });

	return (
		<View style={styles.container}>
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__title}>{translateTutorialNoteLabels("title")}</Text>
			</View>
			<HandSwipeIcon style={tutorialStyles.container__icon} width={150} height={150} color="#fff" fill="#fff" />
		</View>
	);
};

export default React.memo(TutorialNote3);
