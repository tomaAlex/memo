import { IdentifiedUser } from "../User";
import { MatchMessage } from "./matchMessage";

export type MatchPreview = {
	id: string;
	matchedUsers: IdentifiedUser[];
	lastMessage: MatchMessage | null;
};
