import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Bubble.module.scss";

type TProps = {
	note: string;
	sender: "Self" | "Other";
};

const Bubble = ({ note, sender }: TProps) => {
	const isSelf = sender === "Self";
	return (
		<TouchableOpacity style={[styles.messageBubbleGeneral, isSelf ? styles.self__message : styles.other__message]}>
			<Text style={isSelf ? styles.self__message__content : styles.other__message__content}>{note}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(Bubble) as unknown as typeof Bubble;
