import { TimeManagedDocument } from "../Firebase";
import { MatchMessage } from "./matchMessage";

export type Match = TimeManagedDocument & {
	matchedUsers: string[];
	messages: MatchMessage[];
};
