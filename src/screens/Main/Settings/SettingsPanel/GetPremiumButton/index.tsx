import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useFeaturesChecker } from "hooks/index";
import { Feature } from "types/index";
import PremiumPaymentRBSheet from "./PremiumPaymentRBSheet";
import { useTranslation } from "react-i18next";
import styles from "./GetPremiumButton.module.scss";
import PremiumReviewRBSheet from "./PremiumReviewRBSheet";

const GetPremiumButton = () => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.GetPremium" });
	const premiumPaymentRBSheetReference = React.useRef<RBSheet>(null);
	const premiumReviewRBSheetReference = React.useRef<RBSheet>(null);
	const checkFeatures = useFeaturesChecker();
	const checkPremiumState = () => checkFeatures(Feature.BRONZE);
	const isPremium = checkPremiumState();
	const buttonTitle = isPremium ? t("premiumButtonTitle") : t("buttonTitle");
	const openSheet = () => {
		const toHandleRBSheetReference = isPremium ? premiumReviewRBSheetReference : premiumPaymentRBSheetReference;
		toHandleRBSheetReference.current?.open();
	};

	return (
		<>
			<TouchableOpacity style={styles.container} onPress={openSheet}>
				<Text style={styles.container__caption}>{buttonTitle}!</Text>
				<View style={styles.container__shadow} />
			</TouchableOpacity>
			<PremiumPaymentRBSheet refRBSheet={premiumPaymentRBSheetReference} />
			<PremiumReviewRBSheet refRBSheet={premiumReviewRBSheetReference} />
		</>
	);
};

export default React.memo(GetPremiumButton);
