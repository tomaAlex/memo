import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import tutorialStyles from "../Tutorial.module.scss";
import styles from "./Overview.module.scss";

type TProps = {
	next: () => void;
	skip: () => void;
};

const Overview = ({ next, skip }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Tutorial" });

	return (
		<View style={styles.container}>
			<View style={styles.container__titleContainer}>
				<Text style={tutorialStyles.container__title}>{t("Overview.title")}</Text>
			</View>
			<View style={styles.container__decisionsContainer}>
				<TouchableOpacity style={tutorialStyles.container__navigationButton} onPress={next}>
					<Text style={tutorialStyles.container__navigationButton__caption}>{t("nextCaption")}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={skip}>
					<Text style={styles.container__decisionsContainer__skipCaption}>{t("Overview.skipCaption")}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default React.memo(Overview);
