import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import connector from "redux/connector";
import { ScreenProps, SettingsPreferencesScreenNames } from "types";
import styles from "./SettingsPreferencesQrCode.module.scss";
import { useTranslation } from "react-i18next";

const SettingsPreferencesQrCode = ({}: ScreenProps<SettingsPreferencesScreenNames.QRCode>) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.SettingsPreferences.QRCode" });

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.container__qrCodeContainer}
				onPress={() => {
					Linking.openURL("https://memodating.com/#download");
				}}
			>
				<Text style={styles.container__qrCodeContainer__caption}>{t("title")} 💓</Text>
				<Image source={require("./download-qr.png")} style={styles.container__qrCodeContainer__qrCode} />
				<Text style={styles.container__qrCodeContainer__caption}>{t("caption")}!</Text>
			</TouchableOpacity>
		</View>
	);
};

export default connector(SettingsPreferencesQrCode);
