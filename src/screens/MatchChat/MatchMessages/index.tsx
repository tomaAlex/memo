import React from "react";
import { FlatList, View } from "react-native";
import { MatchMessage } from "types/index";
import MatchMessagePreview from "./MatchMessagePreview";
import styles from "../MatchChat.module.scss";

type TProps = {
	messages: MatchMessage[] | null;
};

const MatchMessages = ({ messages }: TProps) => {
	return (
		<FlatList
			style={styles.container__messages}
			data={messages}
			ItemSeparatorComponent={() => <View style={styles.container__messages__separator} />}
			renderItem={({ item, index }) => <MatchMessagePreview key={index} {...item} />}
		/>
	);
};

export default React.memo(MatchMessages);
