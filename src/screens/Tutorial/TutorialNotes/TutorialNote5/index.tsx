import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import tutorialStyles from "../../Tutorial.module.scss";
import styles from "./TutorialNote5.module.scss";
import { CashIcon } from "icons/index";

type TProps = {
	complete: () => void;
};

const TutorialNote5 = ({ complete }: TProps) => {
	// const [translateTutorialLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial" });
	const [translateTutorialNoteLabels] = useTranslation("translation", { keyPrefix: "Screens.Tutorial.Note5" });

	return (
		<View style={styles.container}>
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__title}>{translateTutorialNoteLabels("title")}</Text>
			</View>
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__subTitle}>{translateTutorialNoteLabels("cashOutSubTitle")}</Text>
			</View>
			<CashIcon style={tutorialStyles.container__icon} width={150} height={150} color="#fff" fill="#fff" />
			<View style={styles.container__titleContainer}>
				<Text style={styles.container__titleContainer__disabledNote}>{translateTutorialNoteLabels("content")}</Text>
			</View>
			<TouchableOpacity style={tutorialStyles.container__navigationButton} onPress={complete}>
				<Text style={tutorialStyles.container__navigationButton__caption}>
					{translateTutorialNoteLabels("completeCaption")}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default React.memo(TutorialNote5);
