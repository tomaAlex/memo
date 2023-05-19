import React from "react";
import { MainScreenNames, ScreenProps, SettingsNavigationStackTypes, SettingsScreenNames } from "types/index";
import connector from "../../../redux/connector";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsPanel from "./SettingsPanel";
import SettingsPhotos from "./SettingsPhotos";
import SettingsInformation from "./SettingsInformation";
import SettingsPreferences from "./SettingsPreferences";
import { settingsScreenHeaderOptions } from "./SettingsScreenHeaderOptions";

const SettingsStack = createStackNavigator<SettingsNavigationStackTypes>();

const Settings = ({}: ScreenProps<MainScreenNames.Settings>) => {
	return (
		<SettingsStack.Navigator
			initialRouteName={SettingsScreenNames.SettingsPanel}
			screenOptions={{ headerShown: false }}
		>
			<SettingsStack.Screen name={SettingsScreenNames.SettingsPanel} component={SettingsPanel} />
			<SettingsStack.Screen
				options={settingsScreenHeaderOptions("Gallery")}
				name={SettingsScreenNames.Photos}
				component={SettingsPhotos}
			/>
			<SettingsStack.Screen
				options={settingsScreenHeaderOptions("Profile")}
				name={SettingsScreenNames.Information}
				component={SettingsInformation}
			/>
			<SettingsStack.Screen
				options={settingsScreenHeaderOptions("Settings")}
				name={SettingsScreenNames.Preferences}
				component={SettingsPreferences}
			/>
		</SettingsStack.Navigator>
	);
};

export default connector(Settings);
