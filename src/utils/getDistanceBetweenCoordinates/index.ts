import { Coordinates } from "types/index";
import getRadiansFromDegrees from "./getRadiansFromDegrees";
import getRadiusAtLatitude from "./getRadiusAtLatitude";

/**
 * @returns Distance in kilometers.
 */
export const getDistanceBetweenCoordinates = (from: Coordinates, to: Coordinates): number => {
	// const earthRadiusKm = 6371;
	// const earthRadiusKm = 6367.136;
	// instead of hard coding the earthRadius, we will compute it dynamically, so we know it is accurate
	const earthRadiusKm = getRadiusAtLatitude(from.latitude);

	let fromLatitude = from.latitude;
	let fromLongitude = from.longitude;

	let toLatitude = to.latitude;
	let toLongitude = to.longitude;

	const dLat = getRadiansFromDegrees(toLatitude - fromLatitude);
	const dLon = getRadiansFromDegrees(toLongitude - fromLongitude);

	fromLatitude = getRadiansFromDegrees(fromLatitude);
	toLatitude = getRadiansFromDegrees(toLatitude);

	const { sin, cos, pow, atan2, sqrt } = Math;

	let a = pow(sin(dLat / 2), 2) + pow(sin(dLon / 2), 2) * cos(fromLatitude) * cos(toLatitude);
	let c = 2 * atan2(sqrt(a), sqrt(1 - a));
	return earthRadiusKm * c;
};
