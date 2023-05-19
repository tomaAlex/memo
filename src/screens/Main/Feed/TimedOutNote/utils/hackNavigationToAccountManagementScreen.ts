import { NavigationProp } from "@react-navigation/native";
import { MainNavigationTabTypes, MainScreenNames, SettingsPreferencesScreenNames, SettingsScreenNames } from "types";

export const hackNavigationToAccountManagementScreen = (
	navigation: NavigationProp<MainNavigationTabTypes, MainScreenNames.Feed>
) => {
	navigation.navigate(MainScreenNames.Settings);
	setTimeout(() => {
		navigation.navigate(MainScreenNames.Settings, {
			screen: SettingsScreenNames.Preferences,
		});
	}, 100);
	setTimeout(() => {
		navigation.navigate(MainScreenNames.Settings, {
			screen: SettingsScreenNames.Preferences,
			params: {
				screen: SettingsPreferencesScreenNames.AccountManagement,
			},
		});
	}, 200);
};
