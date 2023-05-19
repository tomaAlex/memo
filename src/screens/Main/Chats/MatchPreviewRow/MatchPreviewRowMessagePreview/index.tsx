import React from "react";
import { Text, View } from "react-native";
import store from "redux/store";
import { IdentifiedUser, MatchMessage } from "types/index";
import styles from "../MatchPreviewRow.module.scss";
import trimMessage from "./utils/trimMessage";
import { getTimestampPreview } from "Firebase/index";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import isMessageSeen from "utils/getSeenByIndicator";
import { NotificationBubble, ReadMessage } from "icons";
import { selectIsPremium } from "redux/selectors";
import { useSelector } from "react-redux";

type TProps = {
	matchedUser: IdentifiedUser;
	lastMessage: MatchMessage<true> | null;
	matchTimestamp: FirebaseFirestoreTypes.Timestamp;
	notifications: number;
};

const MatchPreviewRowMessagePreview = ({ matchedUser, lastMessage, matchTimestamp, notifications }: TProps) => {
	const isPremium = useSelector(selectIsPremium);
	const messagePreview = lastMessage ? lastMessage.content : "Be first to send a message!";
	const seenBy = lastMessage ? lastMessage.seenBy : [];
	const isUserAuthorOfLastMessage = lastMessage ? lastMessage.author === store.getState().user.id : false;
	const messagePreviewMaximumLength = 30;
	const trimmedMessagePreview = trimMessage(messagePreviewMaximumLength, messagePreview);
	const { firstName, lastName } = matchedUser;
	const matchedUserName = trimMessage(15, `${firstName} ${lastName}`);
	const messageTimestamp = lastMessage ? lastMessage.timestamp : matchTimestamp;
	const timestampPreview = getTimestampPreview(messageTimestamp);

	return (
		<>
			<View style={styles.container__lastMessagePreviewContainer}>
				<Text style={styles.container__lastMessagePreviewContainer__name}>{matchedUserName}</Text>
				<Text style={styles.container__lastMessagePreviewContainer__message}>{trimmedMessagePreview}</Text>
			</View>
			<View>
				<Text style={styles.container__timePreview}>{timestampPreview}</Text>
				{isPremium && isUserAuthorOfLastMessage && isMessageSeen([matchedUser], seenBy) && (
					<ReadMessage height={8} style={styles.container__read} />
				)}
				{notifications > 0 && (
					<View style={styles.container__notificationView}>
						<NotificationBubble height={18} />
						<Text style={styles.container__notificationText}>{notifications}</Text>
					</View>
				)}
			</View>
		</>
	);
};

export default React.memo(MatchPreviewRowMessagePreview);
