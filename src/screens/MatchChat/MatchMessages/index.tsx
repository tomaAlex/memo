import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { MatchMessage } from "types/index";
import MatchMessagePreview from "./MatchMessagePreview";
import styles from "../MatchChat.module.scss";
import { IdentifiedUser } from "types/index";

type TProps = {
	messages: MatchMessage[] | null;
	matchedUsers: IdentifiedUser[];
	flatListRef: React.MutableRefObject<FlatList<MatchMessage<true>> | null>;
};

const MatchMessages = ({ messages, matchedUsers, flatListRef }: TProps) => {
	return (
		<FlatList
			ref={flatListRef}
			style={styles.container__chat__messages}
			data={messages}
			inverted
			ItemSeparatorComponent={() => <View style={styles.container__chat__messages__separator} />}
			renderItem={({ item, index }) => <MatchMessagePreview key={index} {...{ ...item, matchedUsers }} />}
		/>
	);
};

export default React.memo(MatchMessages);
