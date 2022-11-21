import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IdentifiedUser } from "types/index";
import styles from "./MatchChatProfilePreview.module.scss";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useRemainingTimePreviewer } from "hooks/index";

type TProps = {
	userToPreview: IdentifiedUser;
	matchTimestamp: FirebaseFirestoreTypes.Timestamp;
	expiresAt: FirebaseFirestoreTypes.Timestamp;
};

const MatchChatProfilePreview = ({ userToPreview, expiresAt }: TProps) => {
	const { firstName, lastName } = userToPreview;
	const userToPreviewName = `${firstName} ${lastName}`;
	const remainingTime = useRemainingTimePreviewer(expiresAt);

	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.container__userPreviewContainer}>
				<Image
					style={styles.container__userPreviewContainer__userPreview}
					key={`${userToPreview.id}-matchChatsProfilePreview`}
					source={{ uri: userToPreview.photos[0] }}
				/>
			</View>
			<Text style={styles.container__name}>{userToPreviewName}</Text>
			<Text style={styles.container__remainingTime}>{remainingTime}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(MatchChatProfilePreview);
