import canUserBeRecommended from "./canUserBeRecommended";
import hasUserPreferredGender from "./hasUserPreferredGender";

const isUserFitToRecommend = (userToRecommendTo: IdentifiedUser, userToPossiblyRecommend: IdentifiedUser): boolean => {
	return (
		canUserBeRecommended(userToPossiblyRecommend) && hasUserPreferredGender(userToRecommendTo, userToPossiblyRecommend)
	);
};

export default isUserFitToRecommend;
