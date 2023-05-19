import React, { Dispatch, SetStateAction } from "react";
import { FlatList, View } from "react-native";
import { AwaitingMatchMessage, MatchMessage } from "types/index";
import MatchMessagePreview from "./MatchMessagePreview";
import styles from "../MatchChat.module.scss";
import { IdentifiedUser } from "types/index";
import AwaitingMatchMessagePreview from "./AwaitingMatchMessagePreview";

type TProps = {
	messages: MatchMessage[] | null;
	awaitingMessages: AwaitingMatchMessage[];
	setAwaitingMessages: Dispatch<SetStateAction<AwaitingMatchMessage[]>>;
	sendMessage: (message: string) => Promise<void>;
	matchedUsers: IdentifiedUser[];
	flatListRef: React.MutableRefObject<FlatList<MatchMessage<true> | AwaitingMatchMessage> | null>;
};

const MatchMessages = ({
	messages,
	matchedUsers,
	flatListRef,
	awaitingMessages,
	setAwaitingMessages,
	sendMessage,
}: TProps) => {
	return (
		<FlatList
			ref={flatListRef}
			style={styles.container__chat__messages}
			data={[...[...awaitingMessages].reverse(), ...(messages ?? [])]}
			inverted
			ItemSeparatorComponent={() => <View style={styles.container__chat__messages__separator} />}
			renderItem={({ item, index }) => {
				const awaitingMessagesNumber = awaitingMessages.length;
				if (index < awaitingMessagesNumber) {
					const awaitingMessagesIndex = awaitingMessagesNumber - index - 1;
					return (
						<AwaitingMatchMessagePreview
							key={index}
							updateFailureStatus={(failed) => {
								const updatedAwaitingMessages = [...awaitingMessages];
								updatedAwaitingMessages[awaitingMessagesIndex].failed = failed;
								setAwaitingMessages(updatedAwaitingMessages);
							}}
							clearSelf={() => {
								const updatedAwaitingMessages = [...awaitingMessages];
								updatedAwaitingMessages.splice(awaitingMessagesIndex, 1);
								setAwaitingMessages(updatedAwaitingMessages);
							}}
							{...{ ...(item as AwaitingMatchMessage), sendMessage }}
						/>
					);
				}
				return <MatchMessagePreview key={index} {...{ ...(item as MatchMessage), matchedUsers }} />;
			}}
		/>
	);
};

export default React.memo(MatchMessages);
