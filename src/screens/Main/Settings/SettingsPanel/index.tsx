import React from "react";
import { SafeAreaView, View } from "react-native";
import connector from "redux/connector";
import { ScreenProps, SettingsScreenNames } from "types/index";
import SettingsSectionButtons from "./SettingsSectionButtons";
import SettingsUserPreviewHeader from "../SettingsUserPreviewHeader";
import styles from "./SettingsPanel.module.scss";
import LogoutButton from "./LogoutButton";

const SettingsPanel = ({}: ScreenProps<SettingsScreenNames.SettingsPanel>) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container__header}>
				<SettingsUserPreviewHeader />
			</View>
			<View style={styles.container__body}>
				<SettingsSectionButtons />
				<LogoutButton />
			</View>
		</SafeAreaView>
	);
};

export default connector(SettingsPanel);
