import React from "react";
import { Text, ViewStyle, View, TouchableOpacity } from "react-native";
import styles from "./Button.module.scss";

type TProps = {
	onPress: () => void;
};

const Button = ({ onPress }: TProps) => {
	return (
		<TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
			<View style={styles.buttonContainer__buttonDimensions}>
				<Text style={styles.buttonContainer__buttonText}>Let's Match</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(Button) as unknown as typeof Button;
