import React from "react";
import { Text, View } from "react-native";
import { MatchMessage } from "types/index";
import MatchMessagePreview from "./MatchMessagePreview";

type TProps = {
	messages: MatchMessage[] | null;
};

const MatchMessages = ({ messages }: TProps) => {
	if (!messages) {
		return (
			<View>
				<Text>No messages yet...</Text>
			</View>
		);
	}

	return (
		<>
			{messages.map((message, messageIndex) => (
				<MatchMessagePreview key={messageIndex} {...message} />
			))}
		</>
	);
};

export default React.memo(MatchMessages);
