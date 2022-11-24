const getAllNotRecommendableUserIds = (
	authenticatedIdentifiedUserData: IdentifiedUser
): Array<IdentifiedUser["id"]> => {
	const currentUserDislikes = authenticatedIdentifiedUserData.dislikes;
	const currentUserLikes = authenticatedIdentifiedUserData.likes;
	return [...currentUserDislikes, ...currentUserLikes, authenticatedIdentifiedUserData.id];
};

export default getAllNotRecommendableUserIds;
