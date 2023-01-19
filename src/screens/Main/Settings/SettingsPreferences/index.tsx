import React from "react";
import { SafeAreaView, View } from "react-native";
import connector from "redux/connector";
import { ScreenProps, SettingsScreenNames } from "types/index";
import SettingsUserPreviewHeader from "../SettingsUserPreviewHeader";
import SettingsPreferencesUpdateForm from "./SettingsPreferencesUpdateForm";
import styles from "./SettingsPreferences.module.scss";

const SettingsPreferences = ({}: ScreenProps<SettingsScreenNames.Preferences>) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container__header}>
				<SettingsUserPreviewHeader />
			</View>
			<View style={styles.container__body}>
				<SettingsPreferencesUpdateForm />
			</View>
		</SafeAreaView>
	);
};

export default connector(SettingsPreferences);
