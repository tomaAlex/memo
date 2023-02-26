import { Match, MatchMessage } from "types/index";
import { useSnapshot } from "../useSnapshot";
import buildMessage from "./buildMessage";
import sendMessage from "./sendMessage";
import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";
import sendMessageNotification from "./sendMessageNotification";

export const useMatchMessages = (
	matchId: string
): [MatchMessage[] | null, (messageContent: string) => Promise<void>] => {
	const [matchData, matchDocumentReference] = useSnapshot<Match>("matches", matchId);
	const matchDataMessages = matchData ? [...matchData.messages] : [];
	const messages = matchDataMessages.reverse();

	const userId = useSelector(selectUser).id;

	const sendMatchMessage = async (messageContent: string) => {
		// await sendMessage(matchId, messageContent);
		const newMessage = buildMessage(userId, messageContent);
		if (!matchData) {
			return;
		}
		try {
			await matchDocumentReference.update({ messages: [...matchData.messages, newMessage] });
		} catch (e) {
			throw new Error("Database update prevented. Match does not exist");
		}
		sendMessageNotification(matchId, messageContent);
	};

	return [messages, sendMatchMessage];
};
