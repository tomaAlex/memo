import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IdentifiedUser } from "types/index";
import { useRemainingTimePreviewer } from "hooks/index";
import MatchChatUserPreview from "./MatchChatUserPreview";
import styles from "./TimedMatchChatUserPreview.module.scss";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type TProps = {
	userToPreview: IdentifiedUser;
	isUserToPreviewTyping?: boolean;
	expiresAt: FirebaseFirestoreTypes.Timestamp;
};

const TimedMatchChatUserPreview = ({ userToPreview, isUserToPreviewTyping = false, expiresAt }: TProps) => {
	const remainingTime = useRemainingTimePreviewer(expiresAt);

	return (
		<View style={styles.container}>
			<MatchChatUserPreview {...{ userToPreview }} />
			<TouchableOpacity style={styles.container__remainingTimeContainer}>
				{isUserToPreviewTyping ? (
					<Text style={styles.container__remainingTimeContainer__typingNote}>typing...</Text>
				) : (
					<>
						<Text style={styles.container__remainingTimeContainer__remainingTime}>{remainingTime}</Text>
						<Text style={styles.container__remainingTimeContainer__remainingTimeLabel}>⌛</Text>
					</>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default React.memo(TimedMatchChatUserPreview);
