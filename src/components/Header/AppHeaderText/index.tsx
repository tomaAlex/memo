import { APP_NAME } from "constants/app";
import React from "react";
import { Text, View } from "react-native";
import styles from "./AppHeaderText.module.scss";
type TProps<D> = Text["props"] & {
	children?: React.ReactNode;
};

function AppHeaderText<D>({ ...textProps }: TProps<D>) {
	return (
		<View style={styles.header}>
			<Text style={styles.header__title} {...{ ...textProps }}>
				{APP_NAME}
			</Text>
		</View>
	);
}

export default React.memo(AppHeaderText) as unknown as typeof AppHeaderText;
