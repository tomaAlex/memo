import { MainScreenNames } from "types/index";
import ChatsIcon from "../Chats/ChatsIcon";
import FeedIcon from "../Feed/FeedIcon";
import SettingsIcon from "../Settings/SettingsIcon";

const getMainNavbarIcon = (currentScreen: MainScreenNames) => {
	switch (currentScreen) {
		case MainScreenNames.Feed:
			return FeedIcon;
		case MainScreenNames.Chats:
			return ChatsIcon;
		case MainScreenNames.Settings:
			return SettingsIcon;
		default:
			return () => null;
	}
};

export default getMainNavbarIcon;
