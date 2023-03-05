import React from "react";
import { View } from "react-native";
import styles from "./Bubble.module.scss";

type TProps = {
	visible: boolean;
};

const BubbleIndentation = ({ visible }: TProps) => {
	return visible ? <View style={styles.messageBubbleWrapper__indentation} /> : null;
};

export default React.memo(BubbleIndentation);
