import React from "react";
import { BellIcon, PrivacyPolicyIcon, QrIcon, UserIcon } from "icons";
import { Alert, Linking, View } from "react-native";
import connector from "redux/connector";
import { SettingsPreferencesScreenNames } from "types";
import SettingsPreferencesButton from "../SettingsPreferencesButton";
import styles from "./SettingsPreferencesPanel.module.scss";
import { useTranslation } from "react-i18next";
import { getNotificationsPermission } from "utils";

type TProps = {};

const SettingsPreferencesPanel = ({}: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Settings.SettingsPreferences.Buttons" });

	return (
		<View style={styles.container}>
			<SettingsPreferencesButton
				fillIcon
				PreferenceIcon={UserIcon}
				preferenceScreen={SettingsPreferencesScreenNames.AccountManagement}
				preferenceName={t("accountManagement")}
			/>
			<SettingsPreferencesButton
				PreferenceIcon={PrivacyPolicyIcon}
				hasCustomBehavior
				// preferenceScreen={SettingsPreferencesScreenNames.PrivacyPolicy}
				customAction={() => {
					Linking.openURL("https://www.privacypolicies.com/live/affbca4d-16ae-4873-bb32-44b0dba9383d");
				}}
				preferenceName={t("privacyPolicy")}
			/>
			<SettingsPreferencesButton
				PreferenceIcon={BellIcon}
				hasCustomBehavior
				customAction={async () => {
					try {
						await getNotificationsPermission();
						Alert.alert(t("Notifications.Confirmation.title"), t("Notifications.Confirmation.details"));
					} catch (err) {
						console.error(err);
						Alert.alert(t("Notifications.Failure.title"), t("Notifications.Failure.details"));
					}
				}}
				preferenceName={t("Notifications.caption")}
			/>
			<SettingsPreferencesButton
				fillIcon
				PreferenceIcon={QrIcon}
				preferenceScreen={SettingsPreferencesScreenNames.QRCode}
				preferenceName={t("qrCode")}
			/>
		</View>
	);
};

export default connector(SettingsPreferencesPanel);
