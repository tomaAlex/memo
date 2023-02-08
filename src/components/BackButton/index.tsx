import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BackTriangle } from "icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./BackButton.module.scss";
import { NavigationStackTypes, ScreenNames } from "types";

type TProps = {
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const BackButton = ({ ...backButtonProps }: TProps) => {
	return (
		<TouchableOpacity onPress={() => backButtonProps.navigation.goBack()}>
			<BackTriangle style={styles.button} height={22} />
		</TouchableOpacity>
	);
};

export default React.memo(BackButton) as unknown as typeof BackButton;
