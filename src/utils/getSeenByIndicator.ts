import { IdentifiedUser } from "types";
const isMessageSeen = (matchedUsers: IdentifiedUser[], seenBy: string[]): boolean => {
	return seenBy.length === matchedUsers.length;
};

export default isMessageSeen;
