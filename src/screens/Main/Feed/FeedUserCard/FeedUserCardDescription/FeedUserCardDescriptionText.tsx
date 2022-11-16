import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import styles from "../FeedUserCard.module.scss";

type TProps = {
	text?: string;
	hasEndingComma?: boolean;
	style?: StyleProp<TextStyle>;
};

const FeedUserCardDescriptionText = ({ text, hasEndingComma = false, style }: TProps) => {
	if (!text) {
		return null;
	}
	const fullText = hasEndingComma ? `${text},` : text;
	return <Text style={[styles.userCardContainer__userCard__descriptionContainer__text, style]}>{fullText}</Text>;
};

export default React.memo(FeedUserCardDescriptionText);
