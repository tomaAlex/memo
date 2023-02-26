import React from "react";
import { Image, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import styles from "./LoginIcon.module.scss";

type TProps = {
	style?: StyleProp<ViewStyle>;
};

const LoginIcon = ({ style }: TProps) => {
	return (
		<View style={style}>
			<TouchableOpacity>
				<Image source={require("./loginIcon.png")} style={styles.icon} />
			</TouchableOpacity>
		</View>
	);
};

export default React.memo(LoginIcon);
