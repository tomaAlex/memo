import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import connector from "redux/connector";
import { ScreenProps, SettingsPreferencesScreenNames } from "types";
import styles from "./SettingsPreferencesQrCode.module.scss";

const SettingsPreferencesQrCode = ({}: ScreenProps<SettingsPreferencesScreenNames.QRCode>) => {
	return (
		<View style={styles.container}>
			{/* <SearchFiltersForm resetRecommendations={resetFilteredRecommendations} /> */}
			{/* <DeleteAccountButton /> */}
			<TouchableOpacity style={styles.container__qrCodeContainer} onPress={() => {}}>
				<Image source={require("./download-qr.png")} style={styles.container__qrCodeContainer__qrCode} />
			</TouchableOpacity>
		</View>
	);
};

export default connector(SettingsPreferencesQrCode);
