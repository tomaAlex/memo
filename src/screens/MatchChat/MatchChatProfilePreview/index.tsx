import React, { ReactElement } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IdentifiedUser } from "types/index";
import styles from "./MatchChatProfilePreview.module.scss";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useRemainingTimePreviewer } from "hooks/index";
import BackButton from "components/BackButton";

type TProps = {
	userToPreview: IdentifiedUser;
	matchTimestamp: FirebaseFirestoreTypes.Timestamp;
	expiresAt: FirebaseFirestoreTypes.Timestamp;
	backButton: ReactElement;
};

const MatchChatProfilePreview = ({ userToPreview, expiresAt, backButton }: TProps) => {
	const { firstName, lastName } = userToPreview;
	const userToPreviewName = `${firstName} ${lastName}`;
	const remainingTime = useRemainingTimePreviewer(expiresAt);

	return (
		<View style={styles.mainContainer}>
			<View style={styles.mainContainer__backIcon}>{backButton}</View>
			<View style={styles.mainContainer__container}>
				<View style={styles.mainContainer__container__userPreviewContainer}>
					<Image
						style={styles.mainContainer__container__userPreviewContainer__userPreview}
						key={`${userToPreview.id}-matchChatsProfilePreview`}
						source={{ uri: userToPreview.photos[0] }}
					/>
				</View>
				<Text style={styles.mainContainer__container__name}>{userToPreviewName}</Text>
				<Text style={styles.mainContainer__container__remainingTime}>{remainingTime}</Text>
			</View>
		</View>
	);
};

export default React.memo(MatchChatProfilePreview);
