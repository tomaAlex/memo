import { IdentifiedUser } from "types";

const getAlreadySwipedState = (
	unfilteredUserId: IdentifiedUser["id"],
	likes: string[],
	dislikes: string[]
): boolean => {
	return [...likes, ...dislikes].includes(unfilteredUserId);
};

export default getAlreadySwipedState;
