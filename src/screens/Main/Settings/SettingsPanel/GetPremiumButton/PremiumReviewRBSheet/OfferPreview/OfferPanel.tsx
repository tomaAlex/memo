import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from "react-redux";
import { selectUpdatedFeatures } from "redux/selectors";
import { Feature, LivedFeature, LivedFeatureExpiration } from "types/index";
import styles from "./OfferPreview.module.scss";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
};

const OfferPanel = ({ refRBSheet }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.GetPremium.ReviewSheet.OfferPreview.Panel",
	});
	const updatedFeatures = useSelector(selectUpdatedFeatures);
	const premiumSubscription = updatedFeatures.find(
		({ feature }) => feature === Feature.BRONZE
	) as LivedFeature<LivedFeatureExpiration>;

	useEffect(() => {
		if (!premiumSubscription) {
			refRBSheet.current?.close();
			return;
		}
	}, [premiumSubscription, refRBSheet]);

	if (!premiumSubscription) {
		return null;
	}

	const { expiresAt } = premiumSubscription;

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
