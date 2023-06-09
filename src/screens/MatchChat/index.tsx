import React, { useEffect, useRef, useState } from "react";
import { useMatchMessages, useTypingMarker } from "hooks/index";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { AwaitingMatchMessage, ScreenNames, ScreenProps } from "types/index";
import connector from "../../redux/connector";
import MatchMessages from "./MatchMessages";
import { MatchMessage } from "types/index";
import MatchMessageTextBar from "./MatchMessages/MatchMessageTextBar";
import styles from "./MatchChat.module.scss";
import MatchChatProfilePreview from "./MatchChatProfilePreview";
import markSeen from "./utils/markSeen";
import { setAdjustResize, setAdjustNothing } from "rn-android-keyboard-adjust";

const MatchChat = ({
	route: {
		params: { matchId, matchedUsers, matchTimestamp, expiresAt },
	},
}: ScreenProps<ScreenNames.MatchChat>) => {
	const [messages, sendNewMessage] = useMatchMessages(matchId);
	const [awaitingMessages, setAwaitingMessages] = useState<AwaitingMatchMessage[]>([]);
	const markTyping = useTypingMarker(matchId);

	useEffect(() => {
		setAdjustResize();
		return () => {
			setAdjustNothing();
		};
	}, []);

	useEffect(() => {
		markSeen(matchId);
	}, [messages, matchId]);

	let flatListRef = useRef<FlatList<MatchMessage | AwaitingMatchMessage> | null>(null);

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container__chat}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				contentContainerStyle={{ paddingBottom: -500 }}
			>
				<MatchChatProfilePreview userToPreview={matchedUsers[0]} {...{ matchId, matchTimestamp, expiresAt }} />
				<MatchMessages
					sendMessage={sendNewMessage}
					{...{ messages, matchedUsers, flatListRef, awaitingMessages, setAwaitingMessages }}
				/>
				<MatchMessageTextBar
					createAwaitingMessage={(message) => {
						setAwaitingMessages([...awaitingMessages, { content: message, failed: false }]);
					}}
					clearAwaitingMessage={() => {
						setAwaitingMessages(awaitingMessages.slice(0, awaitingMessages.length));
					}}
					sendMessage={sendNewMessage}
					{...{ markTyping }}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default connector(MatchChat);
