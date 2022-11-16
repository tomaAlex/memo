import React from "react";
import { View } from "react-native";
import styles from "./FeedUserCard.module.scss";

const FeedUserCardShadow = () => {
	return (
		<View style={styles.userCardContainer__shadowBox}>
			<View style={styles.userCardContainer__shadowBox__mainShadow} />
			<View style={styles.userCardContainer__shadowBox__secondaryShadow} />
		</View>
	);
};

export default React.memo(FeedUserCardShadow);
