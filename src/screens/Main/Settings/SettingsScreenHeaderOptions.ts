import { RouteProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SettingsNavigationStackTypes, SettingsScreenNames } from "types";

export const settingsScreenHeaderOptions = (
	title: string
):
	| StackNavigationOptions
	| ((props: {
			route: RouteProp<SettingsNavigationStackTypes, SettingsScreenNames>;
			navigation: any;
	  }) => StackNavigationOptions)
	| undefined => {
	return {
		headerShown: true,
		headerTitleStyle: { fontFamily: "Poppins-Medium", fontSize: 22, color: "black" },
		headerTitleAlign: "center",
		title,
		headerBackTitleVisible: false,
		headerTintColor: "#f10065",
	};
};
