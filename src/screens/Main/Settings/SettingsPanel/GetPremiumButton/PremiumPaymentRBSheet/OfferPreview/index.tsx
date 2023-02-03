import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import OfferPanel from "./OfferPanel";
import styles from "./OfferPreview.module.scss";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
	displayPaymentOptions: () => void;
};

const OfferPreview = ({ refRBSheet, displayPaymentOptions }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.GetPremium.PaymentSheet.OfferPreview",
	});
	return (
		<View style={styles.container}>
			<OfferPanel />
			<View style={styles.container__decisionArea}>
				<TouchableOpacity style={styles.container__decisionArea__continue} onPress={displayPaymentOptions}>
					<Text style={styles.container__decisionArea__continue__caption}>{t("continue")}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.container__decisionArea__cancel} onPress={() => refRBSheet.current?.close()}>
					<Text style={styles.container__decisionArea__cancel__caption}>{t("cancel")}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default React.memo(OfferPreview);
