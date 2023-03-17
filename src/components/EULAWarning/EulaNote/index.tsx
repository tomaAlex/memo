import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./EulaNote.module.scss";
import { useTranslation } from "react-i18next";

type TProps = {
	noteTranslationKey: string;
};

const EulaNote = ({ noteTranslationKey }: TProps) => {
	const [translateNotes] = useTranslation("translation", { keyPrefix: "Screens.EULA.Notes" });

	return (
		<TouchableOpacity>
			<Text style={styles.note}>- {translateNotes(noteTranslationKey)}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(EulaNote);
