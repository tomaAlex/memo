import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./EULAWarning.module.scss";
import EULASection from "./EULASection";
import EulaNote from "./EulaNote";
import { acceptEULA } from "./utils";

type TProps = {
	setAcceptedEULA: (acceptedEULA: boolean) => void;
};

const EULAWarning = ({ setAcceptedEULA }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.EULA" });

	return (
		<View style={styles.container}>
			<Text style={styles.container__title}>{t("title")}</Text>
			<EulaNote noteTranslationKey="fullReading" />
			<EulaNote noteTranslationKey="defaultAgreement" />
			<EulaNote noteTranslationKey="finalAcknowledgement" />
			<ScrollView style={styles.container__sections}>
				<EULASection index={1} sectionTranslationKey="License" />
				<EULASection index={2} sectionTranslationKey="ObjectionableContent" />
				<EULASection index={3} sectionTranslationKey="UserConduct" />
				<EULASection index={4} sectionTranslationKey="Termination" />
				<EULASection index={5} sectionTranslationKey="LimitationOfLiability" />
				<EULASection index={6} sectionTranslationKey="Indemnification" />
				<EULASection index={7} sectionTranslationKey="GoverningLaw" />
				<EULASection index={8} sectionTranslationKey="EntireAgreement" />
				<EULASection index={9} sectionTranslationKey="ChangesToTheAgreement" />
				<TouchableOpacity style={styles.container__sections__acceptButton} onPress={() => acceptEULA(setAcceptedEULA)}>
					<Text style={styles.container__sections__acceptButton__caption}>{t("accept")}</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default React.memo(EULAWarning);
