const hasUserPreferredGender = (
	userToRecommendTo: IdentifiedUser,
	userToPossiblyRecommend: IdentifiedUser
): boolean => {
	const genderOfUserToPossiblyRecommend = userToPossiblyRecommend.gender;
	const genderOfUserToRecommendTo = userToRecommendTo.gender;
	const genderPreferenceOfUserToRecommendTo = userToRecommendTo.orientation;
	if (genderPreferenceOfUserToRecommendTo === "BI") {
		return true;
	}
	if (genderPreferenceOfUserToRecommendTo === "HETERO") {
		return genderOfUserToPossiblyRecommend !== genderOfUserToRecommendTo;
	}
	return genderOfUserToPossiblyRecommend === genderOfUserToRecommendTo;
};

export default hasUserPreferredGender;
