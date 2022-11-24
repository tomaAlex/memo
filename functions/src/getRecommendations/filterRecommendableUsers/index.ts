import isUserFitToRecommend from "./isUserFitToRecommend";

const filterRecommendableUsers = (
	userToRecommendTo: IdentifiedUser,
	allRecommendableUsers: IdentifiedUser[]
): IdentifiedUser[] => {
	return allRecommendableUsers.filter((userToPossiblyRecommend) =>
		isUserFitToRecommend(userToRecommendTo, userToPossiblyRecommend)
	);
};

export default filterRecommendableUsers;
