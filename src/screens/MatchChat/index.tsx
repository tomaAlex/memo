import React, { useEffect, useRef } from "react";
import { useMatchMessages } from "hooks/index";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { ScreenNames, ScreenProps } from "types/index";
import connector from "../../redux/connector";
import MatchMessages from "./MatchMessages";
import { MatchMessage } from "types/index";
import MatchMessageTextBar from "./MatchMessages/MatchMessageTextBar";
import styles from "./MatchChat.module.scss";
import MatchChatProfilePreview from "./MatchChatProfilePreview";
import markSeen from "./utils/markSeen";

const MatchChat = ({
	route: {
		params: { matchId, matchedUsers, matchTimestamp, expiresAt },
	},
}: ScreenProps<ScreenNames.MatchChat>) => {
	const [messages, sendNewMessage] = useMatchMessages(matchId);

	useEffect(() => {
		markSeen(matchId);
	}, [messages, matchId]);

	let flatListRef = useRef<FlatList<MatchMessage> | null>(null);

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container__chat}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "android" ? 20 : 0}
			>
				<MatchChatProfilePreview
					userToPreview={matchedUsers[0]}
					matchTimestamp={matchTimestamp}
					expiresAt={expiresAt}
				/>
				<MatchMessages messages={messages} matchedUsers={matchedUsers} flatListRef={flatListRef} />
				<MatchMessageTextBar sendMessage={sendNewMessage} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default connector(MatchChat);
