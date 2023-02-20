import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import connector from "../../redux/connector";
// import { useTranslation } from "react-i18next";
import { ScreenNames, ScreenProps } from "types/index";
import styles from "./Tutorial.module.scss";
import Overview from "./Overview";
import TutorialNotes from "./TutorialNotes";

const Tutorial = ({ navigation }: ScreenProps<ScreenNames.Tutorial>) => {
	// const [t] = useTranslation("translation", { keyPrefix: "Screens.Tutorial" });
	const [showTutorial, setShowTutorial] = useState(false);
	const completeTutorial = () => {
		navigation.goBack();
	};

	return (
		<SafeAreaView style={styles.container}>
			<Overview
				next={() => {
					setShowTutorial(true);
				}}
				skip={completeTutorial}
			/>
			<TutorialNotes visible={showTutorial} complete={completeTutorial} />
		</SafeAreaView>
	);
};

export default connector(Tutorial);
