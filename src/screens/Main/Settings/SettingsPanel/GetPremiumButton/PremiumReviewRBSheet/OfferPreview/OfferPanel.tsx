import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUpdatedFeatures } from "redux/selectors";
import { Feature, LivedFeature, LivedFeatureExpiration } from "types/index";
import styles from "./OfferPreview.module.scss";

const OfferPanel = () => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.GetPremium.ReviewSheet.OfferPreview.Panel",
	});
	const updatedFeatures = useSelector(selectUpdatedFeatures);
	const { expiresAt } = updatedFeatures.find(
		({ feature }) => feature === Feature.BRONZE
	) as LivedFeature<LivedFeatureExpiration>;
	const expirationDateNote = expiresAt === null ? t("neverNote") : expiresAt.toDate().toUTCString();

	return (
		<TouchableOpacity style={styles.container__panel}>
			<View style={styles.container__panel__titleContainer}>
				<Text style={styles.container__panel__titleContainer__title}>{t("title")}</Text>
			</View>
			<Text style={styles.container__panel__caption}>{t("expirationNote")}</Text>
			<Text style={styles.container__panel__boldCaption}>{expirationDateNote}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(OfferPanel);
