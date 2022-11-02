import { RouteProp } from "@react-navigation/native";
import { MainNavigationTabTypes, NavigationStackTypes } from "./NavigationStackTypes";
import { MainScreenNames, ScreenNames } from "./ScreenNames";
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

export type ScreenProps<ScreenName extends XOR<ScreenNames, MainScreenNames>> = ScreenName extends ScreenNames
	? BaseScreenProps<ScreenName>
	: ScreenName extends MainScreenNames
	? MainScreenProps<ScreenName>
	: never;
