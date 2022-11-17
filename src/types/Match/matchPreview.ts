import { IdentifiedUser } from "../User";
import { MatchMessage } from "./matchMessage";
import { TimestampedElement } from "../Firebase";

export type MatchPreview = TimestampedElement<false> & {
	id: string;
	matchedUsers: IdentifiedUser[];
	lastMessage: MatchMessage<false> | null;
};
