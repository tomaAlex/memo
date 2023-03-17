import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./EULASection.module.scss";

type TProps = {
	sectionTranslationKey: string;
	index: number;
};

const EULASection = ({ sectionTranslationKey, index }: TProps) => {
	const [translateSectionDetails] = useTranslation("translation", { keyPrefix: "Screens.EULA.Sections" });

	return (
		<TouchableOpacity style={styles.container}>
			<Text style={styles.container__caption}>
				{index}. {translateSectionDetails(`${sectionTranslationKey}.caption`)}
			</Text>
			<Text style={styles.container__description}>
				{translateSectionDetails(`${sectionTranslationKey}.description`)}
			</Text>
		</TouchableOpacity>
	);
};

export default React.memo(EULASection);
