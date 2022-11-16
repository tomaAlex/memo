import React from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import MainScreenIcon from "../MainScreenIcon";
import { UserIcon } from "icons/index";

const SettingsIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused, color }) => {
	return <MainScreenIcon {...{ focused, color, ScreenIcon: UserIcon }} />;
};

export default SettingsIcon;
