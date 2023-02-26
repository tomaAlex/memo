import { IdentifiedUser } from "types/index";

const getUserPreferredLikesOnlyState = (
	unfilteredUserLikes: IdentifiedUser["likes"],
	selfId: string,
	likesOnly: boolean
): boolean => {
	if (!likesOnly) {
		// does not matter if this user already sent a like
		return true;
	}
	return unfilteredUserLikes.includes(selfId);
};

export default getUserPreferredLikesOnlyState;
