import React from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import MainScreenIcon from "../MainScreenIcon";
import { HeartIcon } from "icons/index";

const FeedIcon: BottomTabNavigationOptions["tabBarIcon"] = ({ focused, color }) => {
	return <MainScreenIcon {...{ focused, color, ScreenIcon: HeartIcon }} />;
};

export default FeedIcon;
