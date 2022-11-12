import React from "react";
import { View } from "react-native";
import { MatchMessage } from "types/index";

const MatchMessagePreview = ({ author, content, timestamp }: MatchMessage) => {
	return <View>{content}</View>;
};

export default React.memo(MatchMessagePreview);
