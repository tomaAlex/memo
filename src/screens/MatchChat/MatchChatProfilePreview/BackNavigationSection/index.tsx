import React from "react";
import { View } from "react-native";
import BackButton from "components/BackButton";
import styles from "./BackNavigationSection.module.scss";
import { useNavigation } from "@react-navigation/native";
import { NavigationStackTypes, ScreenNames } from "types/index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const BackNavigationSection = () => {
	const navigation = useNavigation<NativeStackNavigationProp<NavigationStackTypes, ScreenNames.MatchChat>>();

	return (
		<View style={styles.container}>
			<BackButton {...{ navigation }} />
		</View>
	);
};

export default React.memo(BackNavigationSection);
