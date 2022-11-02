import { MainScreenNames } from "types/index";
import ChatsIcon from "../Chats/ChatsIcon";
import FeedIcon from "../Feed/FeedIcon";

const getMainNavbarIcon = (currentScreen: MainScreenNames) => {
	switch (currentScreen) {
		case MainScreenNames.Feed:
			return FeedIcon;
		case MainScreenNames.Chats:
			return ChatsIcon;
		default:
			return () => null;
	}
};

export default getMainNavbarIcon;
