import React from "react";
import connector from "../../redux/connector";
import { MainNavigationTabTypes, MainScreenNames, ScreenNames, ScreenProps } from "types/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "./Feed";
import Chats from "./Chats";
import Settings from "./Settings";
import getMainNavbarIcon from "./utils/getMainNavbarIcon";

const MainTab = createBottomTabNavigator<MainNavigationTabTypes>();

const Main = ({
	route: {
		params: { uid },
	},
}: ScreenProps<ScreenNames.Main>) => {
	return (
		<MainTab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: getMainNavbarIcon(route.name as MainScreenNames),
				headerShown: false,
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
				tabBarShowLabel: false,
			})}
		>
			<MainTab.Screen name={MainScreenNames.Feed} initialParams={{ uid }} component={Feed} />
			<MainTab.Screen name={MainScreenNames.Chats} component={Chats} />
			<MainTab.Screen name={MainScreenNames.Settings} component={Settings} />
		</MainTab.Navigator>
	);
};

export default connector(Main);
