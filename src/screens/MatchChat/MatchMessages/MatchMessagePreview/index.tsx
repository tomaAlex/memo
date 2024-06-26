import React from "react";
import store from "redux/store";
import { cx } from "utils/index";
import { Text, TouchableOpacity, View } from "react-native";
import { MatchMessage } from "types/index";
import styles from "./MatchMessagePreview.module.scss";
import { getTimestampPreview } from "Firebase/index";
import isMessageSeen from "utils/getSeenByIndicator";
import { IdentifiedUser } from "types/index";
import { ReadMessage } from "icons";
import { useSelector } from "react-redux";
import { selectIsPremium } from "redux/selectors";

type TProps = {
	matchedUsers: IdentifiedUser[];
} & MatchMessage;

const MatchMessagePreview = ({ author, content, timestamp, seenBy, matchedUsers }: TProps) => {
	const isAuthorCurrentUser = author === "memo" || author === store.getState().user.id;
	const timestampPreview = getTimestampPreview(timestamp);
	const isPremium = useSelector(selectIsPremium);
	return (
		<View style={cx([styles.self, isAuthorCurrentUser], [styles.other, !isAuthorCurrentUser])}>
			<TouchableOpacity
				style={cx(
					styles.messageBubbleGeneral,
					[styles.self__message, isAuthorCurrentUser],
					[styles.other__message, !isAuthorCurrentUser]
				)}
			>
				<Text
					style={cx(
						[styles.self__message__content, isAuthorCurrentUser],
						[styles.other__message__content, !isAuthorCurrentUser]
					)}
				>
					{content}
				</Text>
			</TouchableOpacity>
			<View style={styles.metadata}>
				<Text
					style={cx(
						styles.metadata__timestamp,
						[styles.self__timestamp, isAuthorCurrentUser],
						[styles.other__timestamp, !isAuthorCurrentUser]
					)}
				>
					{timestampPreview}
				</Text>
				{isPremium && isAuthorCurrentUser && isMessageSeen(matchedUsers, seenBy) && (
					<ReadMessage height={8} style={styles.metadata__read} />
				)}
			</View>
		</View>
	);
};

export default React.memo(MatchMessagePreview);
