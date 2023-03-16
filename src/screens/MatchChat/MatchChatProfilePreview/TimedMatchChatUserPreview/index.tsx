import React from "react";
import { Text, View } from "react-native";
import { IdentifiedUser } from "types/index";
import { useRemainingTimePreviewer } from "hooks/index";
import MatchChatUserPreview from "./MatchChatUserPreview";
import styles from "./TimedMatchChatUserPreview.module.scss";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type TProps = {
	userToPreview: IdentifiedUser;
	expiresAt: FirebaseFirestoreTypes.Timestamp;
};

const TimedMatchChatUserPreview = ({ userToPreview, expiresAt }: TProps) => {
	const remainingTime = useRemainingTimePreviewer(expiresAt);

	return (
		<View style={styles.container}>
			<MatchChatUserPreview {...{ userToPreview }} />
			<Text style={styles.container__remainingTime}>{remainingTime}</Text>
		</View>
	);
};

export default React.memo(TimedMatchChatUserPreview);
