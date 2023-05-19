import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BackTriangle } from "icons";
import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import styles from "./BackButton.module.scss";
import { MainScreenNames, NavigationStackTypes, ScreenNames } from "types";

type TProps = {
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames | MainScreenNames>;
	buttonStyle?: StyleProp<ViewStyle>;
};

const BackButton = ({ ...backButtonProps }: TProps) => {
	const handlePress = () => {
		backButtonProps.navigation.goBack();
	};
	return (
		<TouchableOpacity
			onPress={handlePress}
			style={backButtonProps.buttonStyle ? backButtonProps.buttonStyle : styles.button}
		>
			<BackTriangle height={20} />
		</TouchableOpacity>
	);
};

export default React.memo(BackButton) as unknown as typeof BackButton;
