import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./OfferPreview.module.scss";

const OfferPanel = () => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.GetPremium.PaymentSheet.OfferPreview.Panel",
	});

	return (
		<TouchableOpacity style={styles.container__panel}>
			<View style={styles.container__panel__titleContainer}>
				<Text style={styles.container__panel__titleContainer__title}>{t("title")}</Text>
			</View>
			<Text style={styles.container__panel__month}>
				1{"\n"}
				<Text style={styles.container__panel__month__caption}>{t("month")}</Text>
			</Text>
			<Text style={styles.container__panel__price}>£4.99 + TAX</Text>
			<Text style={styles.container__panel__caption}>{`> ${t("Features.seen")}`}</Text>
			<Text style={styles.container__panel__caption}>{`> ${t("Features.likes")}`}</Text>
			<Text style={styles.container__panel__caption}>{`> ${t("Features.noAds")}`}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(OfferPanel);
