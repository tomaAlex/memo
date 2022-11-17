import React from "react";
import { Text, View } from "react-native";
import { IdentifiedUser, MatchMessage } from "types/index";
import styles from "../MatchPreviewRow.module.scss";
import trimMessage from "./utils/trimMessage";
import { JSONTimestamp } from "types/Firebase/JSONTimestamp";
import { getTimestampFromJSON } from "Firebase/index";

type TProps = {
	matchedUser: IdentifiedUser;
	lastMessage: MatchMessage<false> | null;
	matchTimestamp: JSONTimestamp;
};

const MatchPreviewRowMessagePreview = ({ matchedUser, lastMessage, matchTimestamp }: TProps) => {
	const messagePreview = lastMessage ? lastMessage.content : "Be first to send a message!";
	const messagePreviewMaximumLength = 30;
	const trimmedMessagePreview = trimMessage(messagePreviewMaximumLength, messagePreview);
	const { firstName, lastName } = matchedUser;
	const matchedUserName = `${firstName} ${lastName}`;
	const messageTimestamp = lastMessage ? lastMessage.timestamp : matchTimestamp;
	const realMessageTimestamp = getTimestampFromJSON(messageTimestamp);
	const timestampPreviewWithSeconds = realMessageTimestamp.toDate().toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	const timestampPreview = timestampPreviewWithSeconds.slice(0, -3);

	return (
		<>
			<View style={styles.container__lastMessagePreviewContainer}>
				<Text style={styles.container__lastMessagePreviewContainer__name}>{matchedUserName}</Text>
				<Text style={styles.container__lastMessagePreviewContainer__name__message}>{trimmedMessagePreview}</Text>
			</View>
			<Text style={styles.container__timePreview}>{timestampPreview}</Text>
		</>
	);
};

export default React.memo(MatchPreviewRowMessagePreview);
