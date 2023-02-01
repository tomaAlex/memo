import React, { useEffect } from "react";
import connector from "../../redux/connector";
import { MainNavigationTabTypes, MainScreenNames, ScreenNames, ScreenProps } from "types/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "./Feed";
import Chats from "./Chats";
import Settings from "./Settings";
import getMainNavbarIcon from "./utils/getMainNavbarIcon";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus, selectIsGenericAdShown } from "redux/selectors";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { useInAppInteractionsUpdater } from "hooks";
import { NotificationTypes } from "NotificationManager/notificationTypes";
import MessageNotificationManager from "NotificationManager/MessageNotification";

const MainTab = createBottomTabNavigator<MainNavigationTabTypes>();

const Main = ({
	navigation,
	route: {
		params: { uid },
	},
	user,
	setAwaitingLoginStatus,
	notification,
	clearNotification,
	matchPreviews,
}: ScreenProps<ScreenNames.Main>) => {
	const awaitingLoginStatus = useSelector(selectAwaitingLoginStatus);
	const isGenericAdShown = useSelector(selectIsGenericAdShown);
	const resetInAppAdInteractions = useInAppInteractionsUpdater("reset");

	useEffect(() => {
		if (user) {
			setAwaitingLoginStatus(false);
		}
	}, [user, setAwaitingLoginStatus]);

	const { isLoaded, load, show } = useInterstitialAd(TestIds.INTERSTITIAL, {
		requestNonPersonalizedAdsOnly: true,
	});

	useEffect(() => load(), [load, isGenericAdShown]); // preload the ad

	useEffect(() => {
		const canShowTheAd = isLoaded && isGenericAdShown;
		if (!canShowTheAd) {
			return;
		}
		show();
		resetInAppAdInteractions();
	}, [isGenericAdShown, isLoaded, resetInAppAdInteractions, show]);

	useEffect(() => {
		if (!notification) {
			return;
		}
		if (matchPreviews.length === 0) {
			return;
		}
		switch (notification.data?.type) {
			case NotificationTypes.MESSAGE_NOTIFICATION: {
				clearNotification();
				new MessageNotificationManager(notification, navigation).handleBackground();
				break;
			}
			default: {
				clearNotification();
			}
		}
	}, [notification, matchPreviews]);

	return awaitingLoginStatus ? (
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
			<MainTab.Screen
				name={MainScreenNames.Chats}
				component={Chats}
				options={{ headerShown: true, headerTitleStyle: { fontFamily: "Poppins-Bold" }, headerTitleAlign: "center" }}
			/>
			<MainTab.Screen
				name={MainScreenNames.Settings}
				component={Settings}
				options={{
					headerShown: true,
					headerTitleStyle: { fontFamily: "Poppins-Bold" },
					headerTitleAlign: "center",
				}}
			/>
		</MainTab.Navigator>
	);
};

export default connector(Main);
