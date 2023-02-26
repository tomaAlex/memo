import React, { useEffect, useRef } from "react";
import { getTimestampFromJSON } from "Firebase";
import { useMatchMessages } from "hooks/index";
import { TouchableOpacity } from "react-native";
import { MainScreenNames, MatchPreview, ScreenNames, ScreenProps } from "types/index";
import styles from "./MatchPreviewRow.module.scss";
import MatchPreviewRowMessagePreview from "./MatchPreviewRowMessagePreview";
import MatchPreviewRowUserPreview from "./MatchPreviewRowUserPreview";
import { useMatchNotifications } from "hooks/useFirebaseUtilities/useMatchNotifications";

type TProps = MatchPreview & ScreenProps<MainScreenNames.Chats>;

const MatchPreviewRow = (props: TProps) => {
	const { navigation, updateAllMatchPreviews, matchPreviews, ...matchPreview } = props;
	const { id, timestamp, matchedUsers, expiresAt } = matchPreview;
	const matchedUser = matchedUsers[0];
	const matchTimestamp = getTimestampFromJSON(timestamp);
	const [messages] = useMatchMessages(id);
	const notifications = useMatchNotifications(id);
	const lastMessage = messages && messages.length > 0 ? messages[0] : null;
	const previousTotalMessages = useRef(messages ? messages.length : 0);

	const getOtherMatchPreviews = (id: string) => matchPreviews.filter((matchPreview) => matchPreview.id !== id);

	useEffect(() => {
		if (!messages || messages.length === previousTotalMessages.current) {
			return;
		}
		previousTotalMessages.current = messages.length;
		const otherMatches = getOtherMatchPreviews(id);
		updateAllMatchPreviews([matchPreview, ...otherMatches]);
	}, [lastMessage]);

	const openChat = () => {
		navigation.navigate(ScreenNames.MatchChat, {
			matchId: id,
			matchedUsers,
			matchTimestamp,
			expiresAt: getTimestampFromJSON(expiresAt),
		});
	};

	return (
		<TouchableOpacity style={styles.container} onPress={openChat}>
			<MatchPreviewRowUserPreview {...{ matchedUser }} />
			<MatchPreviewRowMessagePreview {...{ matchedUser, lastMessage, matchTimestamp, notifications }} />
		</TouchableOpacity>
	);
};

export default React.memo(MatchPreviewRow);
