import React, { useEffect, useState } from "react";
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
	user,
}: ScreenProps<ScreenNames.Main>) => {
	const [loading, setLoading] = useState<Boolean>(true);
	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);
	return loading ? (
		<></>
	) : (
		<MainTab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: getMainNavbarIcon(route.name as MainScreenNames),
				tabBarStyle: { height: 70, borderTopColor: "white" },
				headerShown: false,
				tabBarActiveTintColor: "#F10065",
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
