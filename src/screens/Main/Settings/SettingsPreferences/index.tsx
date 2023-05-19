import React from "react";
// import { SafeAreaView, View } from "react-native";
import connector from "redux/connector";
import {
	ScreenProps,
	SettingsPreferencesNavigationStackTypes,
	SettingsPreferencesScreenNames,
	SettingsScreenNames,
} from "types/index";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsPreferencesAccountManagement from "./SettingsPreferencesAccountManagement";
import SettingsPreferencesPanel from "./SettingsPreferencesPanel";
import SettingsPreferencesQrCode from "./SettingsPreferencesQrCode";
// import SettingsUserPreviewHeader from "../SettingsUserPreviewHeader";
// import SettingsPreferencesUpdateForm from "./SettingsPreferencesUpdateForm";
// import styles from "./SettingsPreferences.module.scss";

const SettingsPreferencesStack = createStackNavigator<SettingsPreferencesNavigationStackTypes>();

const SettingsPreferences = ({}: ScreenProps<SettingsScreenNames.Preferences>) => {
	return (
		<SettingsPreferencesStack.Navigator
			initialRouteName={SettingsPreferencesScreenNames.SettingsPreferencesPanel}
			screenOptions={{ headerShown: false }}
		>
			<SettingsPreferencesStack.Screen
				name={SettingsPreferencesScreenNames.SettingsPreferencesPanel}
				component={SettingsPreferencesPanel}
			/>
			<SettingsPreferencesStack.Screen
				name={SettingsPreferencesScreenNames.AccountManagement}
				component={SettingsPreferencesAccountManagement}
			/>
			<SettingsPreferencesStack.Screen
				name={SettingsPreferencesScreenNames.QRCode}
				component={SettingsPreferencesQrCode}
			/>
		</SettingsPreferencesStack.Navigator>
	);

	// return (
	// 	<SafeAreaView style={styles.container}>
	// 		<View style={styles.container__header}>
	// 			<SettingsUserPreviewHeader />
	// 		</View>
	// 		<View style={styles.container__body}>
	// 			<SettingsPreferencesUpdateForm />
	// 		</View>
	// 	</SafeAreaView>
	// );
};

export default connector(SettingsPreferences);
