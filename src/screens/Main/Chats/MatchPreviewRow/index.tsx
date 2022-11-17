import React from "react";
import { TouchableOpacity } from "react-native";
import { MainScreenNames, MatchPreview, ScreenNames, ScreenProps } from "types/index";
import styles from "./MatchPreviewRow.module.scss";
import MatchPreviewRowMessagePreview from "./MatchPreviewRowMessagePreview";
import MatchPreviewRowUserPreview from "./MatchPreviewRowUserPreview";

type TProps = MatchPreview & {
	navigation: ScreenProps<MainScreenNames.Chats>["navigation"];
};

const MatchPreviewRow = ({ id, matchedUsers, lastMessage, timestamp, navigation }: TProps) => {
	const matchedUser = matchedUsers[0];

	const openChat = () => {
		navigation.navigate(ScreenNames.MatchChat, { matchId: id, matchedUsers });
	};

	return (
		<TouchableOpacity style={styles.container} onPress={openChat}>
			<MatchPreviewRowUserPreview {...{ matchedUser }} />
			<MatchPreviewRowMessagePreview {...{ matchedUser, lastMessage, matchTimestamp: timestamp }} />
		</TouchableOpacity>
	);
};

export default React.memo(MatchPreviewRow);
