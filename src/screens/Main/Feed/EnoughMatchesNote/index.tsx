import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./EnoughMatchesNote.module.scss";

const EnoughMatchesNote = () => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.EnoughMatchesNote" });
	return <Text style={styles.caption}>{t("caption")} 🔥</Text>;
};

export default React.memo(EnoughMatchesNote);
