import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { getTimestampFromJSON } from "Firebase";
import NotificationManager from "NotificationManager";
import store from "redux/store";
import { MatchPreview, ScreenNames, ScreenProps } from "types/index";

class MessageNotificationManager extends NotificationManager {
	match: MatchPreview;

	constructor(notification: FirebaseMessagingTypes.RemoteMessage, navigation: ScreenProps<ScreenNames>["navigation"]) {
		super(notification, navigation);
		this.match = this.getMatchFromNotification();
	}

	private getSpecificMatch(matchId: string): MatchPreview {
		const matchPreviews = store.getState().matchPreviews;
		return matchPreviews.filter((preview) => preview.id === matchId)[0];
	}

	private getMatchFromNotification(): MatchPreview {
		const matchId = this.notification.data?.matchId;
		if (!matchId) {
			throw new Error("No match id");
		}
		return this.getSpecificMatch(matchId);
	}

	private constructMatchChatPayload(match: MatchPreview): ScreenProps<ScreenNames.MatchChat>["route"]["params"] {
		return {
			matchId: match.id,
			matchedUsers: match.matchedUsers,
			matchTimestamp: getTimestampFromJSON(match.timestamp),
			expiresAt: getTimestampFromJSON(match.expiresAt),
		};
	}

	handleBackground(): void {
		if (this.match === null) {
			return;
		}
		this.navigation.navigate(ScreenNames.MatchChat, this.constructMatchChatPayload(this.match));
	}

	handleOnOpenApp(): void {
		this.navigation.navigate(ScreenNames.MatchChat, this.constructMatchChatPayload(this.match));
	}
}

export default MessageNotificationManager;
