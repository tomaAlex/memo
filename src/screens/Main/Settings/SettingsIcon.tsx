import React from "react";
import { Text } from "react-native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { MainScreenNames } from "types/index";

const SettingsIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused, color, size }) => {
	const expandedSize = size * 1.1;
	const fontSize = focused ? expandedSize : size;
	return <Text style={{ color, fontSize }}>{MainScreenNames.Settings}</Text>;
};

export default SettingsIcon;
