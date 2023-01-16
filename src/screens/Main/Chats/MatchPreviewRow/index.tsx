import { getTimestampFromJSON } from "Firebase";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MainScreenNames, MatchPreview, ScreenNames, ScreenProps } from "types/index";
import styles from "./MatchPreviewRow.module.scss";
import MatchPreviewRowMessagePreview from "./MatchPreviewRowMessagePreview";
import MatchPreviewRowUserPreview from "./MatchPreviewRowUserPreview";

type TProps = MatchPreview & {
	navigation: ScreenProps<MainScreenNames.Chats>["navigation"];
};

const MatchPreviewRow = ({
	id,
	matchedUsers,
	lastMessage,
	timestamp,
	expiresAt,
	navigation,
	notifications,
}: TProps) => {
	const matchedUser = matchedUsers[0];
	const matchTimestamp = getTimestampFromJSON(timestamp);

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
