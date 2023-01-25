import { RouteProp } from "@react-navigation/native";
import { MainNavigationTabTypes, NavigationStackTypes, SettingsNavigationStackTypes } from "./NavigationStackTypes";
import { MainScreenNames, ScreenNames, SettingsScreenNames } from "./ScreenNames";
import { ReduxProps } from "./redux/props";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { XOR } from "./XOR";

export interface BaseScreenProps<ScreenName extends ScreenNames> extends ReduxProps {
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenName>;
	route: RouteProp<NavigationStackTypes, ScreenName>;
}

export interface MainScreenProps<MainScreenName extends MainScreenNames> extends ReduxProps {
	navigation: BottomTabNavigationProp<MainNavigationTabTypes, MainScreenName>;
	route: RouteProp<MainNavigationTabTypes, MainScreenName>;
}

export interface SettingsScreenProps<SettingsScreenName extends SettingsScreenNames> extends ReduxProps {
	navigation: NativeStackNavigationProp<SettingsNavigationStackTypes, SettingsScreenName>;
	route: RouteProp<SettingsNavigationStackTypes, SettingsScreenName>;
}

export type ScreenProps<ScreenName extends XOR<ScreenNames, XOR<MainScreenNames, SettingsScreenNames>>> =
	ScreenName extends ScreenNames
		? BaseScreenProps<ScreenName>
		: ScreenName extends MainScreenNames
		? MainScreenProps<ScreenName>
		: ScreenName extends SettingsScreenNames
		? SettingsScreenProps<ScreenName>
		: never;
