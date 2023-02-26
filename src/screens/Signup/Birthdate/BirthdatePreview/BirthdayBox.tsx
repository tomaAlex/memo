import React from "react";
import { View, Text } from "react-native";
import styles from "./BirthdayBox.module.scss";

type TProps = {
	label: string;
	value: number;
};

/**
 * Converts a single digit
 * value to double digits
 * @param value the day / month
 */
const processValue = (value: number) => (value < 10 ? "0" + value.toString() : value);

const BirthdayBox = ({ label, value }: TProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.container__label}>{label}</Text>
			<Text style={styles.container__value}>{processValue(value)}</Text>
		</View>
	);
};

export default React.memo(BirthdayBox) as unknown as typeof BirthdayBox;
