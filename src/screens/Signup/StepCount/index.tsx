import React from "react";
import { Text, TextProps } from "react-native";
import styles from "./StepCount.module.scss";

type TProps = {
	stepNo: number;
} & TextProps;

const StepCount = ({ stepNo, ...textProps }: TProps) => {
	const TOTAL_STEPS = 6;
	return <Text style={styles.text} {...textProps}>{`Step ${stepNo} of ${TOTAL_STEPS}`}</Text>;
};

export default React.memo(StepCount) as unknown as typeof StepCount;
