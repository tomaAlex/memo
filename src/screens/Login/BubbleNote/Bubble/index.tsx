import React from "react";
import { Platform, Text, View } from "react-native";
import styles from "./Bubble.module.scss";

type TProps = {
	note: string;
	sender: "Self" | "Other";
};

const Bubble = ({ note, sender }: TProps) => {
	const isSelf = sender === "Self";
	return (
		<View style={[styles.messageBubbleGeneral, isSelf ? styles.self__message : styles.other__message]}>
			<Text style={isSelf ? styles.self__message__content : styles.other__message__content}>{note}</Text>
		</View>
	);
};

export default React.memo(Bubble) as unknown as typeof Bubble;
