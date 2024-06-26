import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./MatchChatUserPreview.module.scss";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { IdentifiedUser, NavigationStackTypes, ScreenNames } from "types/index";
import { useOnlineStatus } from "hooks";

type TProps = {
	userToPreview: IdentifiedUser;
};

const MatchChatUserPreview = ({ userToPreview }: TProps) => {
	const { firstName, lastName, id: userToPreviewId } = userToPreview;
	const userToPreviewName = `${firstName} ${lastName}`;
	const navigation = useNavigation<NativeStackNavigationProp<NavigationStackTypes, ScreenNames.MatchChat>>();
	const isUserToPreviewOnline = useOnlineStatus(userToPreview.id);

	return (
		<>
			<TouchableOpacity
				style={styles.previewContainer}
				onPress={() => {
					navigation.navigate(ScreenNames.ProfilePreview, { userToPreviewId });
				}}
			>
				<Image
					style={styles.previewContainer__user}
					key={`${userToPreviewId}-matchChatsProfilePreview`}
					source={{ uri: userToPreview.photos[0] }}
				/>
				{isUserToPreviewOnline && <View style={styles.previewContainer__onlineBubble} />}
			</TouchableOpacity>
			<Text style={styles.name}>{userToPreviewName}</Text>
		</>
	);
};

export default React.memo(MatchChatUserPreview);
