import { Match, MatchMessage } from "types/index";
import { useSnapshot } from "../useSnapshot";
import sendMessage from "./sendMessage";

export const useMatchMessages = (
	matchId: string
): [MatchMessage[] | null, (messageContent: string) => Promise<void>] => {
	const [matchData] = useSnapshot<Match>("matches", matchId);
	const messages = matchData ? matchData.messages : null;

	const sendMatchMessage = (messageContent: string) => {
		return sendMessage(matchId, messageContent) as unknown as Promise<void>;
	};

	return [messages, sendMatchMessage];
};
