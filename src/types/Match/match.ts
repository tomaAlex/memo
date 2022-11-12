import { MatchMessage } from "./matchMessage";

export type Match = {
	matchedUsers: string[];
	messages: MatchMessage[];
	timestamp: Date;
};
