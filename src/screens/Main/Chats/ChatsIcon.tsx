import React from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import MainScreenIcon from "../MainScreenIcon";
import { MessageIcon } from "icons/index";

const ChatsIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused, color }) => {
	return <MainScreenIcon {...{ focused, color, ScreenIcon: MessageIcon }} />;
};

export default ChatsIcon;
