import { Match, MatchMessage, ReduxProps } from "types/index";
import { useSnapshot } from "../useSnapshot";
import sendMessage from "./sendMessage";

export const useMatchMessages = (
	matchId: string,
	updateMatchPreviewLastMessage?: ReduxProps["updateMatchPreviewLastMessage"]
): [MatchMessage[] | null, (messageContent: string) => Promise<void>] => {
	const [matchData] = useSnapshot<Match>("matches", matchId);
	const messages = matchData ? matchData.messages : null;

	const sendMatchMessage = async (messageContent: string) => {
		const lastMessage = await sendMessage(matchId, messageContent);
		if (!updateMatchPreviewLastMessage) {
			return;
		}
		updateMatchPreviewLastMessage({ id: matchId, newLastMessage: lastMessage });
	};

	return [messages, sendMatchMessage];
};
