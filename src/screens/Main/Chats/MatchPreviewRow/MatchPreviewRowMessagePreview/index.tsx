import React from "react";
import { Text, View } from "react-native";
import { IdentifiedUser, MatchMessage } from "types/index";
import styles from "../MatchPreviewRow.module.scss";
import trimMessage from "./utils/trimMessage";
import { getTimestampFromJSON, getTimestampPreview } from "Firebase/index";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type TProps = {
	matchedUser: IdentifiedUser;
	lastMessage: MatchMessage<false> | null;
	matchTimestamp: FirebaseFirestoreTypes.Timestamp;
};

const MatchPreviewRowMessagePreview = ({ matchedUser, lastMessage, matchTimestamp }: TProps) => {
	const messagePreview = lastMessage ? lastMessage.content : "Be first to send a message!";
	const messagePreviewMaximumLength = 30;
	const trimmedMessagePreview = trimMessage(messagePreviewMaximumLength, messagePreview);
	const { firstName, lastName } = matchedUser;
	const matchedUserName = `${firstName} ${lastName}`;
	const messageTimestamp = lastMessage ? getTimestampFromJSON(lastMessage.timestamp) : matchTimestamp;
	const timestampPreview = getTimestampPreview(messageTimestamp);

	return (
		<>
			<View style={styles.container__lastMessagePreviewContainer}>
				<Text style={styles.container__lastMessagePreviewContainer__name}>{matchedUserName}</Text>
				<Text style={styles.container__lastMessagePreviewContainer__message}>{trimmedMessagePreview}</Text>
			</View>
			<Text style={styles.container__timePreview}>{timestampPreview}</Text>
		</>
	);
};

export default React.memo(MatchPreviewRowMessagePreview);
