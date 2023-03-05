import React from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import styles from "./LoginIcon.module.scss";

type TProps = {
	style?: StyleProp<ViewStyle>;
};

const LoginIcon = ({ style }: TProps) => {
	return (
		<View style={style}>
			<Image source={require("./loginIcon.png")} style={styles.icon} />
		</View>
	);
};

export default React.memo(LoginIcon);
