import Loading from "components/Loading";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import OfferPanel from "./OfferPanel";
import styles from "./OfferPreview.module.scss";
import cancelSubscription from "./utils/cancelSubscription";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
};

const OfferPreview = ({ refRBSheet }: TProps) => {
	const [t] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Settings.GetPremium.ReviewSheet.OfferPreview",
	});

	const [isCancellingSubscription, setIsCancellingSubscription] = useState(false);

	const closeRBSheet = () => {
		refRBSheet.current?.close();
	};

	const handleSubscriptionCancelation = async (): Promise<void> => {
		if (isCancellingSubscription) {
			return;
		}
		setIsCancellingSubscription(true);
		try {
			await cancelSubscription();
			closeRBSheet();
		} catch (error) {
			// do not close the RBSheet, as the cancelation request failed
		}
		setIsCancellingSubscription(false);
	};

	return (
		<View style={styles.container}>
			<OfferPanel />
			<View style={styles.container__decisionArea}>
				<TouchableOpacity style={styles.container__decisionArea__continue} onPress={closeRBSheet}>
					<Text style={styles.container__decisionArea__continue__caption}>{t("continue")}</Text>
				</TouchableOpacity>
				{isCancellingSubscription ? (
					<View style={styles.container__decisionArea__loadingContainer}>
						<Loading />
					</View>
				) : (
					<TouchableOpacity style={styles.container__decisionArea__cancel} onPress={handleSubscriptionCancelation}>
						<Text style={styles.container__decisionArea__cancel__caption}>{t("cancel")}</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default React.memo(OfferPreview);
