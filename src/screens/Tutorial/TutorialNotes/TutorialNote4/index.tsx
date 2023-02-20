import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import tutorialStyles from "../../Tutorial.module.scss";
import styles from "./TutorialNote4.module.scss";
import { StarsIcon } from "icons/index";

const TutorialNote4 = () => {
	// const [translateTutorialLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial" });
	const [translateTutorialNoteLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial.Note4" });

	return (
		<View style={styles.container}>
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__title}>{translateTutorialNoteLabels("title")}</Text>
			</View>
			<StarsIcon style={tutorialStyles.container__icon} width={200} height={200} color="#fff" fill="#fff" />
		</View>
	);
};

export default React.memo(TutorialNote4);
