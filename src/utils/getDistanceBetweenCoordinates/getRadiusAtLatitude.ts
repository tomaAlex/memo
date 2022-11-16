import getRadiansFromDegrees from "./getRadiansFromDegrees";

const getRadiusAtLatitude = (latitude: number): number => {
	latitude = getRadiansFromDegrees(latitude);

	const WGS_ELLIPSOID = { a: 6378137.0, b: 6356752.314 }; // meter
	let f1: number = Math.pow(Math.pow(WGS_ELLIPSOID.a, 2) * Math.cos(latitude), 2);
	let f2: number = Math.pow(Math.pow(WGS_ELLIPSOID.b, 2) * Math.sin(latitude), 2);
	let f3: number = Math.pow(WGS_ELLIPSOID.a * Math.cos(latitude), 2);
	let f4: number = Math.pow(WGS_ELLIPSOID.b * Math.sin(latitude), 2);

	let radius: number = Math.sqrt((f1 + f2) / (f3 + f4));

	return radius / 1000; // return the result in km
};

export default getRadiusAtLatitude;
