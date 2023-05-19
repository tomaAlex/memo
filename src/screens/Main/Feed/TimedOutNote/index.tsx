import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./TimedOutNote.module.scss";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainNavigationTabTypes, MainScreenNames, SettingsPreferencesScreenNames, SettingsScreenNames } from "types";
import { hackNavigationToAccountManagementScreen } from "./utils";

const TimedOutNote = () => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.TimedOutNote" });
	const navigation = useNavigation<NavigationProp<MainNavigationTabTypes, MainScreenNames.Feed>>();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					hackNavigationToAccountManagementScreen(navigation);
				}}
				style={styles.container__captionContainer}
			>
				<Text style={styles.container__captionContainer__caption}>{t("caption")} 😶‍🌫️</Text>
				<Text style={styles.container__captionContainer__subCaption}>
					{`${MainScreenNames.Settings} > ${SettingsScreenNames.Preferences} > ${SettingsPreferencesScreenNames.AccountManagement}`}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default React.memo(TimedOutNote);
