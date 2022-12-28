import forceUserLike from "./forceUserLike";

const createInstantMatch = async (creatorUserId: string, matchedUserId: string): Promise<void> => {
	await forceUserLike(creatorUserId, matchedUserId);
	await forceUserLike(matchedUserId, creatorUserId);
};

export default createInstantMatch;
