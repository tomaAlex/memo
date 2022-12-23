import React, { useEffect } from "react";
import { useMatchMessages } from "hooks/index";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { ScreenNames, ScreenProps } from "types/index";
import connector from "../../redux/connector";
import MatchMessages from "./MatchMessages";
import MatchMessageTextBar from "./MatchMessages/MatchMessageTextBar";
import styles from "./MatchChat.module.scss";
import MatchChatProfilePreview from "./MatchChatProfilePreview";
import markSeen from "./utils/markSeen";

const MatchChat = ({
	route: {
		params: { matchId, matchedUsers, matchTimestamp, expiresAt },
	},
	updateMatchPreviewLastMessage,
}: ScreenProps<ScreenNames.MatchChat>) => {
	const [messages, sendNewMessage] = useMatchMessages(matchId, updateMatchPreviewLastMessage);

	useEffect(() => {
		markSeen(matchId);
	}, [messages, matchId]);

	return (
		<SafeAreaView>
			<KeyboardAvoidingView style={styles.container}>
				<MatchChatProfilePreview
					userToPreview={matchedUsers[0]}
					matchTimestamp={matchTimestamp}
					expiresAt={expiresAt}
				/>
				<MatchMessages messages={messages} />
				<MatchMessageTextBar sendMessage={sendNewMessage} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default connector(MatchChat);
