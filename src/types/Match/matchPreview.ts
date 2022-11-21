import { IdentifiedUser } from "../User";
import { MatchMessage } from "./matchMessage";
import { TimeManagedDocument } from "../Firebase";

export type MatchPreview = TimeManagedDocument<false> & {
	id: string;
	matchedUsers: IdentifiedUser[];
	lastMessage: MatchMessage<false> | null;
};
