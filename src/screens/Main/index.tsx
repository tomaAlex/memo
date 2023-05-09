import React, { useEffect } from "react";
import connector from "../../redux/connector";
import { MainNavigationTabTypes, MainScreenNames, ScreenNames, ScreenProps } from "types/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "./Feed";
import Chats from "./Chats";
import Settings from "./Settings";
import getMainNavbarIcon from "./utils/getMainNavbarIcon";
import { useSelector } from "react-redux";
import { selectAwaitingLoginStatus, selectIsGenericAdShown, selectIsPremium } from "redux/selectors";
import { useInterstitialAd } from "react-native-google-mobile-ads";
import { useInAppInteractionsUpdater } from "hooks";
import { NotificationTypes } from "NotificationManager/notificationTypes";
import MessageNotificationManager from "NotificationManager/MessageNotification";
// import { AdsConsent, AdsConsentStatus } from "react-native-google-mobile-ads";
import Config from "react-native-config";
import { Platform } from "react-native";

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
	const isPremium = useSelector(selectIsPremium);
	const awaitingLoginStatus = useSelector(selectAwaitingLoginStatus);
	const isGenericAdShown = useSelector(selectIsGenericAdShown);
	const resetInAppAdInteractions = useInAppInteractionsUpdater("reset");

	useEffect(() => {
		if (user) {
			setAwaitingLoginStatus(false);
		}
	}, [user, setAwaitingLoginStatus]);

	// we are currently not displaying targeted ads
	// const getAdConsent = async () => {
	// 	return await AdsConsent.requestInfoUpdate();
	// };

	// const showAdConsentForm = async () => {
	// 	return await AdsConsent.showForm();
	// };

	// const getUserChoice = async () => {
	// 	const { selectPersonalisedAds } = await AdsConsent.getUserChoices();
	// 	return selectPersonalisedAds;
	// };

	// useEffect(() => {
	// 	getAdConsent().then((consentInfo) => {
	// 		showAdConsentForm().then((status) => {
	// 			getUserChoice().then((choice) => {
	// 				console.log(choice);
	// 			});
	// 		});
	// 	});
	// }, []);

	const AD_KEY = (Platform.OS === "ios" ? Config.IOS_AD_KEY : Config.ANDROID_AD_KEY) as string;

	const { isLoaded, load, show } = useInterstitialAd(AD_KEY, {
		requestNonPersonalizedAdsOnly: true,
	});

	// const { isLoaded, load, show } = useInterstitialAd(TestIds.INTERSTITIAL, {
	// 	requestNonPersonalizedAdsOnly: true,
	// });

	useEffect(() => load(), [load, isGenericAdShown]); // preload the ad

	useEffect(() => {
		// const canShowTheAd = !isPremium && isLoaded && isGenericAdShown;
		console.warn("ignoring", { isPremium });
		// TODO: remove this line when we have implemented proper premium accounts management
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
				options={{
					headerShown: true,
					headerTitleStyle: { fontFamily: "Poppins-Bold" },
					headerTitleAlign: "center",
				}}
			/>
			<MainTab.Screen
				name={MainScreenNames.Settings}
				component={Settings}
				options={{
					headerShown: false,
					headerTitleStyle: { fontFamily: "Poppins-Bold" },
					headerTitleAlign: "center",
				}}
			/>
		</MainTab.Navigator>
	);
};

export default connector(Main);
