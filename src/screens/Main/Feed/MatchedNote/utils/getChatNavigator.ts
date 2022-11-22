import { getTimestampFromJSON } from "Firebase";
import { MainScreenNames, ScreenNames, ScreenProps, MatchPreview } from "types/index";

const getChatNavigator = (
	navigation: ScreenProps<MainScreenNames.Feed>["navigation"],
	{ id, matchedUsers, timestamp, expiresAt }: MatchPreview,
	closeMatchedNote: () => void
): (() => void) => {
	return () => {
		closeMatchedNote();
		navigation.navigate(ScreenNames.MatchChat, {
			matchId: id,
			matchedUsers,
			matchTimestamp: getTimestampFromJSON(timestamp),
			expiresAt: getTimestampFromJSON(expiresAt),
		});
	};
};

export default getChatNavigator;
