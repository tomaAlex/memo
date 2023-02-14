import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BackTriangle } from "icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./BackButton.module.scss";
import { MainScreenNames, NavigationStackTypes, ScreenNames } from "types";

type TProps = {
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames | MainScreenNames>;
};

const BackButton = ({ ...backButtonProps }: TProps) => {
	const handlePress = () => {
		backButtonProps.navigation.goBack();
	};
	return (
		<TouchableOpacity onPress={handlePress}>
			<BackTriangle style={styles.button} height={20} />
		</TouchableOpacity>
	);
};

export default React.memo(BackButton) as unknown as typeof BackButton;
