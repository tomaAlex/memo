import React from "react";
import { Image, View } from "react-native";
import { IdentifiedUser } from "types/index";
import styles from "./MatchPreviewRow.module.scss";

type TProps = {
	matchedUser: IdentifiedUser;
};

const MatchPreviewRowUserPreview = ({ matchedUser }: TProps) => {
	return (
		<View style={styles.container__userPreviewContainer}>
			<Image
				style={styles.container__userPreviewContainer__userPreview}
				key={`${matchedUser.id}-matchProfilePreview`}
				source={{ uri: matchedUser.photos[0] }}
			/>
		</View>
	);
};

export default React.memo(MatchPreviewRowUserPreview);
