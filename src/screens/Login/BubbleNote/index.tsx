import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Bubble from "./Bubble";
import styles from "./BubbleNote.module.scss";

const BubbleNote = () => {
	const [translateNote] = useTranslation("translation", { keyPrefix: "Screens.Login" });
	return (
		<View style={styles.container}>
			<Bubble note={translateNote("selfMessage")} sender="Self" />
			<Bubble note={translateNote("otherMessage")} sender="Other" />
		</View>
	);
};

export default React.memo(BubbleNote) as unknown as typeof BubbleNote;
