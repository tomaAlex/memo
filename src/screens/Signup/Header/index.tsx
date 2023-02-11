import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "components/BackButton";
import React from "react";
import { View } from "react-native";
import { MainScreenNames, NavigationStackTypes, ScreenNames } from "types";
import StepCount from "../StepCount";
import styles from "./Header.module.scss";

type TProps = {
	stepNo: number;
	navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames | MainScreenNames>;
};

const stepContainer = (stepNo: number, child: JSX.Element) => {
	return stepNo > 1 ? (
		<View style={styles.container__stepContainer}>{child}</View>
	) : (
		<View style={styles.container__initialStepContainer}>{child}</View>
	);
};

const Header = ({ stepNo, navigation }: TProps) => {
	const isInitialStep = stepNo == 1;
	return (
		<View style={[styles.container, isInitialStep && { justifyContent: "center" }]}>
			{!isInitialStep ? <BackButton navigation={navigation} /> : <></>}
			{stepContainer(stepNo, <StepCount stepNo={stepNo} />)}
		</View>
	);
};

export default React.memo(Header) as unknown as typeof Header;
