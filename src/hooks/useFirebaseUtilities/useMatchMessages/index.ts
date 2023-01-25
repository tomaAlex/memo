import { Match, MatchMessage } from "types/index";
import { useSnapshot } from "../useSnapshot";
import sendMessage from "./sendMessage";

export const useMatchMessages = (
	matchId: string
): [MatchMessage[] | null, (messageContent: string) => Promise<void>] => {
	const [matchData] = useSnapshot<Match>("matches", matchId);
	const matchDataMessages = matchData ? [...matchData.messages] : [];
	const messages = matchDataMessages.reverse();

	const sendMatchMessage = async (messageContent: string) => {
		await sendMessage(matchId, messageContent);
	};

	return [messages, sendMatchMessage];
};
