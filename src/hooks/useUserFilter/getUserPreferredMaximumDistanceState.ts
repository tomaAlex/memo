import { Coordinates } from "types/index";
import { getDistanceBetweenCoordinates } from "utils/index";

const getUserPreferredMaximumDistanceState = (
	unfilteredUserLocation: Coordinates,
	selfLocation: Coordinates,
	maximumDistance: number
): boolean => {
	const distanceBetweenSelfAndLikedUser = getDistanceBetweenCoordinates(selfLocation, unfilteredUserLocation);
	return distanceBetweenSelfAndLikedUser <= maximumDistance;
};

export default getUserPreferredMaximumDistanceState;
