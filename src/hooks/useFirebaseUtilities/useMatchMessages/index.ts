import { Match, MatchMessage } from "types/index";
import { useSnapshot } from "../useSnapshot";
// import buildMessage from "./buildMessage";
import sendMessage from "./sendMessage";
// import { useSelector } from "react-redux";
// import { selectUser } from "redux/selectors";
import sendMessageNotification from "./sendMessageNotification";
import { useEffect, useState } from "react";

export const useMatchMessages = (
	matchId: string
): [MatchMessage[] | null, (messageContent: string) => Promise<void>] => {
	const [matchData, matchDocumentReference] = useSnapshot<Match>("matches", matchId);
	// const matchDataMessages = matchData ? [...matchData.messages] : [];
	// const messages = matchDataMessages.reverse();
	const [messages, setMessages] = useState<MatchMessage[]>([]);

	useEffect(() => {
		if (!matchData || !matchData.messages) {
			return;
		}
		const possiblyUpdatedMessages = [...matchData.messages].reverse();
		const didMessagesChange = JSON.stringify(possiblyUpdatedMessages) !== JSON.stringify(messages);
		if (!didMessagesChange) {
			return;
		}
		setMessages(possiblyUpdatedMessages);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchData?.messages]);

	// const userId = useSelector(selectUser).id;

	// const sendMatchMessage = async (messageContent: string) => {
	// 	// await sendMessage(matchId, messageContent);
	// 	const newMessage = buildMessage(userId, messageContent);
	// 	if (!matchData) {
	// 		return;
	// 	}
	// 	try {
	// 		await matchDocumentReference.update({ messages: [...matchData.messages, newMessage] });
	// 	} catch (e) {
	// 		throw new Error("Database update prevented. Match does not exist");
	// 	}
	// 	sendMessageNotification(matchId, messageContent);
	// };

	const sendMatchMessage = async (messageContent: string) => {
		await sendMessage(matchId, messageContent);
		sendMessageNotification(matchId, messageContent);
	};

	return [messages, sendMatchMessage];
};
