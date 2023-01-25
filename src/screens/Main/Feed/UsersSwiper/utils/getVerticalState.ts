import { IdentifiedUser } from "types/index";

const getVerticalState = (currentlyDisplayedUserIndex: number, recommendations: IdentifiedUser[]): boolean => {
	if (currentlyDisplayedUserIndex >= recommendations.length) {
		return false;
	}
	return recommendations[currentlyDisplayedUserIndex].hasInstantMatchingOn;
};

export default getVerticalState;
