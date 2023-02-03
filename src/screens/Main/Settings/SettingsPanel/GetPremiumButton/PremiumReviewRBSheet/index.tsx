import React from "react";
import { useTranslation } from "react-i18next";
import RBSheet from "react-native-raw-bottom-sheet";
import OfferPreview from "./OfferPreview";
import styles from "./PremiumReviewRBSheet.module.scss";
import LinearGradient from "react-native-linear-gradient";
import { Text, View } from "react-native";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
};

const PremiumReviewRBSheet = ({ refRBSheet }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.GetPremium.ReviewSheet",
	});

	return (
		// https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148
		// @ts-ignore
		<RBSheet
			ref={refRBSheet}
			height={300}
			closeOnDagDown
			closeOnPressMask
			keyboardAvoidingViewEnabled
			customStyles={{
				container: styles.container,
				draggableIcon: styles.container__draggableIcon,
			}}
		>
			<LinearGradient colors={["#f5b029", "#ffffff"]} style={styles.container__gradient}>
				<View style={styles.container__titleContainer}>
					<Text style={styles.container__titleContainer__title}>{t("title")}</Text>
				</View>
				<OfferPreview {...{ refRBSheet }} />
			</LinearGradient>
		</RBSheet>
	);
};

export default React.memo(PremiumReviewRBSheet);
