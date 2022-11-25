import React from "react";
import store from "redux/store";
import { cx } from "utils/index";
import { Text, TouchableOpacity, View } from "react-native";
import { MatchMessage } from "types/index";
import styles from "./MatchMessagePreview.module.scss";
import { getTimestampPreview } from "Firebase/index";

const MatchMessagePreview = ({ author, content, timestamp }: MatchMessage) => {
	const isAuthorCurrentUser = author === "memo" ?? author === store.getState().user.id;
	const timestampPreview = getTimestampPreview(timestamp);

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
			<Text
				style={cx(
					styles.timestamp,
					[styles.self__timestamp, isAuthorCurrentUser],
					[styles.other__timestamp, !isAuthorCurrentUser]
				)}
			>
				{timestampPreview}
			</Text>
		</View>
	);
};

export default React.memo(MatchMessagePreview);
