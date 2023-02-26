import React from "react";
import { View, Text } from "react-native";
import { cx } from "utils/index";
import styles from "./UsersSwiperOverlay.module.scss";

type TProps = {
	backgroundColor: string;
	caption: string;
};

const UsersSwiperOverlay = ({ backgroundColor, caption }: TProps) => {
	return (
		<View style={cx(styles.container, { backgroundColor })}>
			<Text style={styles.container__caption}>{caption}</Text>
		</View>
	);
};

export default React.memo(UsersSwiperOverlay);
