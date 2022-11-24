import { MAXIMUM_MATCHES } from "../../constants";

const canUserBeRecommended = (userToCheckRecommendationStatusFor: IdentifiedUser): boolean => {
	return userToCheckRecommendationStatusFor.matches.length < MAXIMUM_MATCHES;
};

export default canUserBeRecommended;
