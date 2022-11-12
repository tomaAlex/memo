import React from "react";
import { Text, View } from "react-native";
import { MatchMessage } from "types/index";

const MatchMessagePreview = ({ author, content, timestamp }: MatchMessage) => {
	return (
		<View>
			<Text>{content}</Text>
		</View>
	);
};

export default React.memo(MatchMessagePreview);
