import { IdentifiedUser } from "../User";
import { TimeManagedDocument } from "../Firebase";

export type MatchPreview = TimeManagedDocument<false> & {
	id: string;
	matchedUsers: IdentifiedUser[];
};
